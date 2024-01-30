"use client";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 800px)").matches);
    };

    // Initial check on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(isMobile);
  return (
    <div className="">
      <div
        className={`w-full flex justify-between items-center shadow-sm border-b border-l  py-6 ${
          isMobile ? "px-3" : "px-20"
        }`}
      >
        <div className="flex">
          {isMobile ? (
            <Button variant="link">
              <HamburgerMenuIcon className="w-6 h-6" />
            </Button>
          ) : null}
          <h1 className="text-3xl font-bold">Yanuar</h1>
        </div>
        <ul className="flex justify-evenly gap-5">
          <li>
            <Button variant="link">
              <Link href="">Home</Link>
            </Button>
          </li>
          <li>
            <Button variant="link">
              <Link href="">About</Link>
            </Button>
          </li>
          <li>
            <Button variant="link">
              <Link href="">Setiting</Link>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
