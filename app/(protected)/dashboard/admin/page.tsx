"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
const Dashboard = () => {
  const [user, setUser] = useState<Array<string> | undefined>();
  const [isPending, setTransition] = useTransition();
  const onSubmit = () => {
    logout();
  };
  const { data } = useSession();
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=20")
      .then((response) => response.json())
      .then((json) => {
        setTransition(() => {
          setUser(json);
        });
      });
  }, []);
  console.log(user);
  return (
    <div>
      <form onSubmit={onSubmit}>
        {JSON.stringify(data)}
        <Button variant="destructive" type="submit">
          Logout
        </Button>
      </form>

      {user && user.length >= 1
        ? user?.slice(0,5).map((item: any) => (
            <ul key={item.id}>
              <li>{item.id}</li>
              <li>{item.title}</li>
              {/* Add other properties here */}
            </ul>
          ))
        : "loading"}
    </div>
  );
};

export default Dashboard;
