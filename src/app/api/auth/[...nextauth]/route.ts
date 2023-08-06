import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize (credentials, req) {
        if (typeof credentials !== "undefined") {
          const res = await fetch("http://localhost:3000/api/login", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify({
              username: credentials?.username,
              password: credentials?.password
            })
          })

          const user = await res.json();

          if (typeof user !== "undefined") {
            return user
          } else {
            return null
          }
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({token, user}) {
      return {...token, ...user}
    },

    async session({session, token}) {
      session.user = token as any
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }