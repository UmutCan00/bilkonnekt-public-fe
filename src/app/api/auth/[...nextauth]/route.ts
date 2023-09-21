// Original filename: [...nextauth].ts  
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const Backend_URL = "http://localhost:3500";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await fetch(Backend_URL + "/api/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email, password
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status == 401) {
          console.log(res.statusText);

          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
 
      if (user) return { ...token, ...user };

      return { ...token };
    },

    async session({ token, session }) {
 
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
