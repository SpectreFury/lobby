"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
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
import VoiceChat from "./_components/voice-chat";

const VoiceChatLobby = ({ params }: { params: any }) => {
  if (!params.squadId) return;

  const { isAuthenticated, isLoading } = useConvexAuth();
  const { socket } = useSocket();
  const { user } = useUser();
  const [isVoiceOn, setIsVoiceOn] = useState(false);
  const [stream, setStream] = useState<MediaStream>();

  const joinSquad = useMutation(api.squad.joinSquad);
  const leaveSquad = useMutation(api.squad.leaveSquad);

  // if (!isAuthenticated) return;

  const { addMessage } = useChatStore();

  const squad = useQuery(api.squad.getSquad, {
    squadId: params.squadId as Id<"squads">,
  });

  useEffect(() => {
    if (!socket || !user || !isAuthenticated) return;

    socket.on("receive_audio", (data: any) => {
      console.log(data);
    });

    // const initiateAudioCall = async () => {
    //   if (squad?.players.length !== 1) return;

    //   const currentStream = await navigator.mediaDevices.getUserMedia({
    //     audio: true,
    //   });
    //   console.log(currentStream);
    //   setStream(currentStream);

    //   const peer = new Peer({ initiator: true, stream: stream });

    //   peer.on("signal", (data) => {
    //     socket.emit("send_audio", {
    //       roomId: params.squadId,
    //       user: user,
    //       stream: data,
    //     });
    //   });

    //   peer.on("stream", (data) => {
    //     console.log("STREAM DATA IS AVAILABLE NOW");
    //   });
    // };

    // initiateAudioCall();

    // const joinOnMount = async () => {
    //   await joinSquad({
    //     squadId: params.squadId,
    //   });
    // };

    // joinOnMount();

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

    return () => {
      // const leaveOnUnmount = async () => {
      //   await leaveSquad({
      //     squadId: params.squadId,
      //   });
      // };
      // leaveOnUnmount();
    };
  }, [socket, user, isAuthenticated]);

  if (isLoading) return <div>Loading</div>;

  if (!squad) return;

  return (
    <div className="container h-[calc(100vh-97px)] relative flex flex-col justify-between">
      {/* <div>{squad.players.length}</div>
      <div>{isVoiceOn ? <Mic /> : <MicOff />}</div> */}
      <VoiceChat squad={squad} />
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
