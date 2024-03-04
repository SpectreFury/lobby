"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Invite = ({ params }: { params: any }) => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-full">
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite link</DialogTitle>
            <DialogDescription>
              Are you sure you want to join the lobby
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                router.push(`/lobby/${params.roomId}`);
              }}
            >
              Join squad
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Invite;
