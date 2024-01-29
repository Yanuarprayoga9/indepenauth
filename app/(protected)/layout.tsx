"use server";
import React from "react";
import { SessionProvider } from "next-auth/react";
const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <div className="h-full flex items-center justify-center">{children}</div>
    </SessionProvider>
  );
};

export default ProtectedLayout;
