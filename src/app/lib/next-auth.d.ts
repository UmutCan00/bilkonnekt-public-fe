import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
        _id: string,
        username: string,
        email: string,
        password: string,
        isActivated: boolean,
        role: string,
        created_at: string,
        updated_at: string,
        __v: number,
        refresh_token: string,
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      name: string;
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}