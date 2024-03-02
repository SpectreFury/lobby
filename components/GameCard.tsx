'use client';

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type GameCardProps = {
  imageUrl: string;
  name: string;
  activeSquads: string;
};

const GameCard = ({ imageUrl, name, activeSquads }: GameCardProps) => {
  const router = useRouter();

  return (
    <Card
      className="max-w-[200px] flex flex-col overflow-hidden items-center"
      onClick={() => router.push(`/dashboard/${name}`)}
    >
      <Image src={imageUrl} alt="Game Image" width={200} height={200} />
      <div className="text-lg font-semibold">{name}</div>
      <div className="text-muted-foreground">{activeSquads}</div>
    </Card>
  );
};

export default GameCard;
