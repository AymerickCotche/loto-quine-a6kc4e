import NextAuth from "next-auth"

declare module 'next-auth' {
  interface Session {
    user:{
      id:number
      name: number
      email: string
      accessToken: string
    }
  }
}