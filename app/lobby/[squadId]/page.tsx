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
import VoiceChat from "./_components/voice-chat";
import Peer, { MediaConnection } from "peerjs";

const VoiceChatLobby = ({ params }: { params: any }) => {
  if (!params.squadId) return;

  const { isAuthenticated, isLoading } = useConvexAuth();
  const { socket } = useSocket();
  const { user } = useUser();

  const [micPermission, setMicPermission] = useState(false);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [otherPeerId, setOtherPeerId] = useState("");
  const [call, setCall] = useState<MediaConnection | null>(null);

  // if (!isAuthenticated) return;

  const { addMessage, clearMessages } = useChatStore();

  const squad = useQuery(api.squad.getSquad, {
    squadId: params.squadId as Id<"squads">,
  });

  const addPlayer = useMutation(api.squad.addPlayer);
  const getUserByPeerId = useMutation(api.user.getUserByPeerId);
  const removePlayer = useMutation(api.squad.removePlayer);

  const setPeerId = useMutation(api.user.setPeerId);

  const joinVoice = async () => {
    if (!peer) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const call = peer?.call(otherPeerId, stream);

    call?.on("stream", (remoteStream) => {
      const audio = new Audio();
      audio.srcObject = remoteStream;

      audio.play();
    });

    const user = await getUserByPeerId({
      peerId: peer.id,
    });

    if (!user) return;

    addPlayer({
      id: user._id,
      name: user.name,
      imageUrl: user.imageUrl,
      peerId: peer.id,
      squadId: params.squadId,
    });
  };

  const leaveVoice = async () => {
    if (!peer) return;

    removePlayer({
      peerId: peer.id,
      squadId: params.squadId,
    });
  };

  useEffect(() => {
    const initializePeer = async () => {
      if (!socket) return;

      const Peer = (await import("peerjs")).default;

      const peer = new Peer();
      setPeer(peer);

      peer.on("open", async (id) => {
        console.log(`Peer joined ${id}`);

        setPeerId({
          peerId: id,
        });

        socket.emit("peer_joined", {
          roomId: params.squadId,
          id,
        });
      });

      peer.on("connection", (connection) => {
        connection.on("open", () => {
          setOtherPeerId(connection.peer);
          console.log("Connected to peers");
        });
      });

      peer.on("call", async (call) => {
        setCall(call);

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        call.answer(stream);

        call.on("stream", (remoteStream) => {
          const audio = new Audio();

          audio.srcObject = remoteStream;
          audio.play();
        });
      });

      socket.on("receive_peer", (id: any) => {
        console.log("Received a peer: ", id);

        setOtherPeerId(id);

        const connection = peer.connect(id);

        connection.on("open", () => {
          console.log("The peer has connected successful");
        });
      });
    };

    initializePeer();
  }, [socket]);

  useEffect(() => {
    if (!socket || !user || !isAuthenticated) return;

    socket.on("receive_audio", (data: any) => {
      console.log(data);
    });

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
      clearMessages();
    };
  }, [socket, user, isAuthenticated]);

  if (isLoading) return <div>Loading</div>;

  if (!squad) return;

  return (
    <div className="container h-[calc(100vh-97px)] relative flex flex-col justify-between">
      <button
        onClick={() => {
          setMicPermission(true);
        }}
      ></button>
      <VoiceChat squad={squad} joinVoice={joinVoice} leaveVoice={leaveVoice} />
      <SquadInfo
        name={squad.name}
        description={squad.description}
        roomId={params.squadId as string}
      />
      <ChatBox />
      <ChatInput roomId={params.squadId as string} />{" "}
    </div>
  );
};

export default VoiceChatLobby;
