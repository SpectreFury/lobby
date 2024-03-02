import React from "react";
import GameCard from "@/components/GameCard";
import { db } from "@/lib/db";

const Dashboard = async () => {
  const games = await db.game.findMany();

  return (
    <div className="container pt-20 flex gap-6">
      {games.map((game) => (
        <GameCard
          name={game.name}
          imageUrl={game.imageUrl}
          activeSquads="120"
        />
      ))}
    </div>
  );
};

export default Dashboard;
