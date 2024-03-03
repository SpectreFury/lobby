import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { useSocket } from "@/components/providers/socket-provider";
import { useRouter } from "next/navigation";

type SquadCardType = {
  id: Id<"squads">;
  name: string;
  description: string;
  playerCount: number;
  players?: Id<"users">[];
};

const SquadCard = ({
  id,
  name,
  description,
  playerCount,
  players,
}: SquadCardType) => {
  const { socket } = useSocket();
  const router = useRouter();

  const joinSquad = async () => {
    socket.emit("join_room", id);
    router.push(`/lobby/${id}`);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("clientMessage", (message: string) => {
      alert(message);
    });
  }, [socket]);

  return (
    <Card className="max-w-[300px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div>{playerCount} players</div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          {players?.map((player) => (
            <div
              className="hover:bg-neutral-200 dark:hover:bg-gray-700 rounded px-2 cursor-pointer"
              key={player}
            >
              {player}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" onClick={joinSquad}>
          Join squad
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SquadCard;
