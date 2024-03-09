import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GOOGLE_SECRET_ID as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        console.log(account)
        token.accessToken = account.access_token
      }
      return token
    },
  },
  // pages: {
  //   signIn: '/login',
  // },

  secret: process.env.NEXT_AUTH_SECRET as string,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
