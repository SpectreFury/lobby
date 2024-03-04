"use client";

import React, { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import SquadInfo from "./_components/squad-info";
import ChatBox from "./_components/chat-box";
import { useConvexAuth } from "convex/react";
import ChatInput from "./_components/chat-input";
import ChatNotification from "./_components/chat-notification";
import { useSocket } from "@/components/providers/socket-provider";
import { useUser } from "@clerk/nextjs";
import { useChatStore } from "@/store/useChatStore";

const VoiceChatLobby = ({ params }: { params: any }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { socket } = useSocket();
  const { user } = useUser();

  if (!isAuthenticated) return;

  const { addMessage } = useChatStore();

  const squad = useQuery(api.squad.getSquad, {
    squadId: params.squadId as Id<"squads">,
  });

  useEffect(() => {
    if (!socket) return;

    socket.emit("join_room", {
      roomId: params.squadId,
      user,
    });

    socket.on("join_confirmation", (data: any) => {
      console.log(`${data.username} joined ${data.roomId}`);
    });

    socket.on("receive_message", (data: any) => {
      addMessage({
        user: data.user,
        content: data.message,
      });
      console.log(data);
    });
  }, []);

  if (isLoading) return <div>Loading</div>;

  if (!squad) return;

  return (
    <div className="container h-[calc(100vh-97px)] relative flex flex-col justify-between">
      <SquadInfo name={squad.name} description={squad.description} />
      <ChatNotification />
      <ChatBox />
      <ChatInput roomId={params.squadId as string} />
    </div>
  );
};

export default VoiceChatLobby;
