"use client";

import React from "react";
import SquadCard from "@/components/SquadCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import SocketIndicator from "@/components/socket-indicator";
import { useSocket } from "@/components/providers/socket-provider";

const DUMMY_PLAYERS = [
  {
    name: "Ronnie",
  },
  {
    name: "Jason",
  },
  {
    name: "Sebastian",
  },
];

type Params = {
  gameId: string;
};

const Squads = ({ params }: { params: Params }) => {
  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft size="18" />
            </Link>
          </Button>
          <div className="my-6 text-lg font-semibold">{params.gameId}</div>
          <SocketIndicator />
        </div>
        <Input className="max-w-[200px]" placeholder="Search squads" />
      </div>
      <div className="mt-20 flex gap-6">
        <SquadCard
          name="Jacob"
          description="A nice game of csgo"
          playerCount={1}
          players={DUMMY_PLAYERS}
        />
        <SquadCard
          name="Ronnie"
          description="A nice game of csgo"
          playerCount={1}
          players={DUMMY_PLAYERS}
        />
        <SquadCard
          name="Sebastian"
          description="A nice game of csgo"
          playerCount={1}
          players={DUMMY_PLAYERS}
        />
      </div>
    </div>
  );
};

export default Squads;
