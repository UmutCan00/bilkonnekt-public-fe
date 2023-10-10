import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
const Backend_URL = "https://fine-ruby-moth-wig.cyclic.app";

export const authOptions : NextAuthOptions = {
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
    
    pages: {
      signIn: '/login',
    },
  
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