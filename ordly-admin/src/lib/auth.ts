import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.name || !credentials?.password) {
          throw new Error('이름과 비밀번호를 입력해주세요.');
        }

        const user = await prisma.user.findUnique({
          where: { name: credentials.name },
          include: { store: true },
        });

        if (!user) {
          throw new Error('존재하지 않는 사용자입니다.');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('비밀번호가 일치하지 않습니다.');
        }

        return {
          id: user.id,
          name: user.name,
          email: `${user.name}@${user.store.name}.com`,
          storeId: user.storeId,
          storeName: user.store.name,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.storeId = user.storeId;
        token.storeName = user.storeName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.storeId = token.storeId;
        session.user.storeName = token.storeName;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
