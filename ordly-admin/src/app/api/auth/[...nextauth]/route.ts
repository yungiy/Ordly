
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  // 1. 인증 프로바이더 설정
  providers: [
    // 'name'과 'password'를 사용한 로그인을 위한 CredentialsProvider
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      // 2. 로그인 요청 시 실행되는 authorize 함수
      async authorize(credentials) {
        if (!credentials?.name || !credentials?.password) {
          throw new Error('이름과 비밀번호를 입력해주세요.');
        }

        // 3. DB에서 Admin 정보 조회
        const admin = await prisma.admin.findUnique({
          where: { name: credentials.name },
        });

        if (!admin) {
          throw new Error('존재하지 않는 사용자입니다.');
        }

        // 4. 비밀번호 일치 여부 확인
        const isPasswordValid = await bcrypt.compare(credentials.password, admin.password);

        if (!isPasswordValid) {
          throw new Error('비밀번호가 일치하지 않습니다.');
        }

        // 5. authorize 함수는 NextAuth에서 사용할 사용자 객체를 반환해야 합니다.
        // NextAuth의 User 타입은 id, name, email을 필수로 요구합니다.
        // Admin 정보를 바탕으로 이 객체를 구성합니다.
        return {
          id: admin.id,
          name: admin.name,
          // email 필드는 필수이지만, 여기서는 고유값을 위해 name을 사용합니다.
          email: `${admin.name}@admin.com`,
        };
      },
    }),
  ],

  // 3. 세션 관리 전략 설정 (JWT 사용)
  session: {
    strategy: 'jwt',
  },

  // 4. NextAuth 페이지 설정
  pages: {
    signIn: '/auth', // 로그인 페이지 경로
    error: '/auth', // 에러 발생 시 리디렉션될 경로
  },

  // 5. 콜백 함수 설정
  callbacks: {
    // JWT가 생성되거나 업데이트될 때마다 실행됩니다.
    // authorize에서 반환된 user 객체의 id를 token에 담습니다.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // 세션이 조회될 때마다 실행됩니다.
    // token의 정보를 session 객체에 담아 클라이언트로 전달합니다.
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
      }
      return session;
    },
  },

  // 6. 시크릿 키 설정
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
