import React from "react";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <nav className="p-6 border-b">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold">Lobby</div>
            <div className="text-xs font-semibold px-2 border rounded bg-neutral-200">
              BETA
            </div>
          </div>
        </div>
      </nav>
      <div className="h-full flex flex-col items-center p-20">
        <div className="text-3xl font-bold">
          The definitive way of finding friends, and playing games
        </div>
        <Button asChild className="mt-2">
          <SignInButton mode="modal" redirectUrl="/dashboard">
            Sign In
          </SignInButton>
        </Button>
        <SignOutButton></SignOutButton>
      </div>
    </main>
  );
}
