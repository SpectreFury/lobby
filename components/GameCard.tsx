"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

type GameCardProps = {
  id: Id<"games">;
  storageId: string;
  name: string;
  activeSquads: number;
};

const GameCard = ({ id, storageId, name, activeSquads }: GameCardProps) => {
  const router = useRouter();
  const imageUrl = useQuery(api.game.getImageUrl, {
    id: storageId as Id<"_storage">,
  });

  if (!imageUrl) return;

  return (
    <Card
      className="max-w-[200px] flex flex-col overflow-hidden items-center cursor-pointer"
      onClick={() => router.push(`/dashboard/${id}`)}
    >
      <Image
        src={imageUrl}
        alt="Game Image"
        width={200}
        height={200}
        className="flex-1"
      />
      <div className="text-lg font-semibold">{name}</div>
      <div className="text-muted-foreground">{activeSquads}</div>
    </Card>
  );
};

export default GameCard;
