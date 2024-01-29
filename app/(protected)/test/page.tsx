"use client"
import React from "react";
import { useSession } from "next-auth/react";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const onSubmit = () => {
    logout()
  };
  const {data} = useSession();
  console.log(data)

  return (
    <div>
      <form onSubmit={onSubmit}>
        {
            JSON.stringify(data)
        }
        <Button variant="destructive" type="submit">
          Logout
        </Button>
      </form>
    </div>
  );
};

export default Dashboard;
