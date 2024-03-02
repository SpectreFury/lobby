import React from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Player = {
  name: string;
};

type SquadCardType = {
  name: string;
  description: string;
  playerCount: number;
  players: Player[];
};

const SquadCard = ({
  name,
  description,
  playerCount,
  players,
}: SquadCardType) => {
  return (
    <Card className="max-w-[300px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div>{playerCount} players</div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          {players.map((player) => (
            <div className="hover:bg-neutral-200 dark:hover:bg-gray-700 rounded px-2 cursor-pointer">
              {player.name}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Join squad
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SquadCard;
