import 'next-auth'
import { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface User {
    id: number
    username: string
    email: string
    name?: string | null
    createdAt: string
  }
  
  interface Session {
    user: {
      id: number
      username: string
      email: string
      name?: string | null
      createdAt: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number
    username: string
    email: string
    createdAt: string
  }
}
