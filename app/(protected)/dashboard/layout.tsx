"use server";
import React from "react";
import { SessionProvider } from "next-auth/react";
import Navbar from "./_components/navbar";
const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <div className="h-full w-full ">
        <div className="w-full">
          <Navbar />
        </div>
        {children}
      </div>
    </SessionProvider>
  );
};

export default ProtectedLayout;
