import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { env } from 'next-runtime-env';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: { access_type: 'offline', prompt: 'consent' },
      },
    }),
  ],
  trustHost: true,
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === 'google') {
        // console.log("sign in :" ,  account)
        return true;
      }

      return false;
    },
    async jwt({ token, user, account }) {
      if (account && account.provider === 'google') {
        // console.log("user : " , user)
        try {
          const res = await fetch(env('NEXT_PUBLIC_API_URL') + '/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_token: account.id_token }),
          });
          const data = await res.json();

          console.log( "responses status : ", res.status)
          console.log('data : ', data);
          token.backendToken = data.token;
          token.role = data.role;
          token.id = data.id;
        } catch (e) {
          console.error('Error during Google authentication:', e);
        }
        // console.log("account:", account)
      }

      return token;
    },
    session({ session, token }) {
      if (token) {
        if (session.user) {
          if (session) {
            session.backendToken = token.backendToken as string;
            session.user.role = token.role as string;
          }
        }
      }

      return session;
    },
  },
});
