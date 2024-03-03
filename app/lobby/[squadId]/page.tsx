"use client";

import React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import SquadInfo from "./_components/squad-info";
import ChatBox from "./_components/chat-box";

const VoiceChatLobby = () => {
  const params = useParams();

  const squad = useQuery(api.squad.getSquad, {
    squadId: params.squadId as Id<"squads">,
  });

  if (!squad) return;

  return (
    <div className="container h-full">
      <SquadInfo name={squad.name} description={squad.description} />
      <ChatBox />
    </div>
  );
};

export default VoiceChatLobby;
