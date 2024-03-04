"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import SquadInfo from "./_components/squad-info";
import ChatBox from "./_components/chat-box";
import { useConvexAuth } from "convex/react";
import ChatInput from "./_components/chat-input";
import { useSocket } from "@/components/providers/socket-provider";
import { useUser } from "@clerk/nextjs";
import { useChatStore } from "@/store/useChatStore";
import { Mic, MicOff } from "lucide-react";
import Peer from "simple-peer";

const VoiceChatLobby = ({ params }: { params: any }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { socket } = useSocket();
  const { user } = useUser();
  const [isVoiceOn, setIsVoiceOn] = useState(false);
  const [stream, setStream] = useState<MediaStream>();

  // if (!isAuthenticated) return;

  const { addMessage } = useChatStore();

  const squad = useQuery(api.squad.getSquad, {
    squadId: params.squadId as Id<"squads">,
  });

  useEffect(() => {
    if (!socket || !user) return;

    socket.emit("join_room", {
      roomId: params.squadId,
      user,
    });

    socket.on("join_confirmation", (data: any) => {
      console.log(`${data.user.firstName} joined ${data.roomId}`);
      addMessage({
        type: "NOTIFICATION",
        user: {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          imageUrl: data.user.imageUrl,
        },
      });
    });

    socket.on("receive_message", (data: any) => {
      console.log("MESSAGE IS BEING RECEIVED");
      addMessage({
        type: "MESSAGE",
        user: data.user,
        content: data.message,
      });
    });
  }, [socket, user]);

  if (isLoading) return <div>Loading</div>;

  if (!squad) return;

  return (
    <div className="container h-[calc(100vh-97px)] relative flex flex-col justify-between">
      <div>{isVoiceOn ? <Mic /> : <MicOff />}</div>
      <SquadInfo
        name={squad.name}
        description={squad.description}
        roomId={params.squadId as string}
      />
      <ChatBox />
      <ChatInput roomId={params.squadId as string} />
    </div>
  );
};

export default VoiceChatLobby;
