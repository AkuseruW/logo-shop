import { compare } from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { signJwtAccessToken } from '@/lib/jwt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from '@prisma/client'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({

      name: 'Credentials',
      credentials: {
        email: {},
        password: {}
      },

      async authorize(credentials) {

        if (!credentials?.email || !credentials.password) {
          throw new Error("Credentials are missing.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: { id: true, email: true, name: true, password: true, role: true }
        })

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error("Invalid credentials.");
        }

        const { id, email, name, role } = user

        return {
          id,
          email,
          name,
          role,
        }
      }

    })
  ],

  pages: {
    signIn: '/signin',
    signOut: '/signout',
    error: '/signin',
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as User;
      return session;
    },
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
