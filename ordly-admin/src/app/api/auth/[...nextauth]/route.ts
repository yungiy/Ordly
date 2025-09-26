import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      // 로그인 요청 시 실행되는 authorize 함수
      async authorize(credentials) {
        if (!credentials?.name || !credentials?.password) {
          throw new Error('이름과 비밀번호를 입력해주세요.');
        }

        const admin = await prisma.admin.findUnique({
          where: { name: credentials.name },
        });
        if (!admin) {
          throw new Error('존재하지 않는 사용자입니다.');
        }
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          admin.password
        );
        if (!isPasswordValid) {
          throw new Error('비밀번호가 일치하지 않습니다.');
        }

        // authorize 함수는 NextAuth에서 사용할 사용자 객체를 반환
        return {
          id: admin.id,
          name: admin.name,
          email: `${admin.name}@admin.com`,
        };
      },
    }),
  ],

  // jwt로 세션관리
  session: {
    strategy: 'jwt',
  },

  //  NextAuth 페이지 설정
  pages: {
    signIn: '/auth',
    error: '/auth',
  },

  // 콜백 함수 설정
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
      }
      return session;
    },
  },

  // 시크릿키 설정
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
