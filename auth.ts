import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";
import { getUserByUserId } from "./data/user";

const prisma = new PrismaClient();

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user }) {
      return true;
    },
    async session({ session }) {
      console.log({ session });
      return session;
    },
    async jwt({ token }) {
      const user = await getUserByUserId(token.sub as string);
      if (user) {
        token.role = user.UserRole;
      }
      console.log({ token });
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
