import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { User } from "@prisma/client"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Please enter username and password')
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username
          }
        })

        if (!user) {
          return null
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordMatch) {
          return null
        }

        return user
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.email = user.email
        token.createdAt = user.createdAt
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as number
        session.user.username = token.username as string
        session.user.email = token.email as string
        session.user.createdAt = token.createdAt as string
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
