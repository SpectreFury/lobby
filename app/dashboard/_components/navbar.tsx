import React from "react";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
  return (
    <nav className="p-6 border-b">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold">Lobby</div>
          <div className="text-xs font-semibold px-2 border rounded bg-gray-200 dark:bg-gray-700">
            BETA
          </div>
        </div>
        <div className="flex items-center gap-2">
          <UserButton afterSignOutUrl="/" />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
