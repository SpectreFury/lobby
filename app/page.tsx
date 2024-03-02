import React from "react";
import { SignInButton, SignOutButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <SignInButton mode="modal" />
      <SignOutButton/>
    </main>
  );
}
