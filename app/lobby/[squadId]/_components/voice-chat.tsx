import React, { useState, useEffect } from "react";

import VoiceChatItem from "./voice-chat-item";
import { Plus, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import AgoraRTC from "agora-rtc-react";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  UID,
  IAgoraRTCRemoteUser,
} from "agora-rtc-react";

type Player = {
  id: Id<"users">;
  name: string;
  imageUrl: string;
  uid: string | number;
};

type Squad = {
  _id: Id<"squads">;
  name: string;
  description: string;
  game: Id<"games">;
  players: Player[];
};

type VoiceChatProps = {
  squad: Squad;
  client: IAgoraRTCClient;
};

const VoiceChat = ({ squad, client }: VoiceChatProps) => {
  const [micPermission, setMicPermission] = useState(false);
  const [audioTrack, setAudioTrack] = useState<IMicrophoneAudioTrack | null>(
    null
  );
  const [roomUsers, setRoomUsers] = useState<any[]>([]);
  const [remoteUsers, setRemoteUsers] = useState<any>({});
  const [currentUserId, setCurrentUserId] = useState<UID | undefined>();

  // const joinSquad = useMutation(api.squad.joinSquad);
  // const leaveSquad = useMutation(api.squad.leaveSquad);

  const addPlayer = useMutation(api.squad.addPlayer);
  const removePlayer = useMutation(api.squad.removePlayer);

  const setUid = useMutation(api.user.setUid);
  const getUserByUid = useMutation(api.user.getUserByUid);

  const handleUserJoined = async (user: IAgoraRTCRemoteUser) => {
    console.log("A NEW USER HAS JOINED");

    const currentUser = await getUserByUid({
      uid: user.uid,
    });

    // await addPlayer({
    //   uid: user.uid,
    //   squadId: squad._id,
    //   id: currentUser._id,
    //   name: currentUser.name,
    //   imageUrl: currentUser.imageUrl,
    // });

    // setRoomUsers((prev) => [
    //   ...prev,
    //   {
    //     name: user.uid,
    //   },
    // ]);
  };

  const handleUserPublished = async (
    user: IAgoraRTCRemoteUser,
    mediaType: "audio" | "video"
  ) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "audio") {
      setRemoteUsers((prev: any) => ({ ...prev, [user.uid]: user.audioTrack }));
      user.audioTrack?.play();
    }
  };

  const handleUserLeft = async (user: IAgoraRTCRemoteUser) => {
    delete remoteUsers[user.uid];
    setRoomUsers((prev) =>
      prev.filter((roomUser) => roomUser.name !== user.uid)
    );
  };

  const enterRoom = async () => {
    const uid = await client.join(
      process.env.NEXT_PUBLIC_AGORA_APP_ID!,
      "squad",
      null
    );

    await setUid({
      uid: uid,
    });

    client.on("user-joined", handleUserJoined);
    client.on("user-published", handleUserPublished);
    client.on("user-left", handleUserLeft);

    setCurrentUserId(uid);

    const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    setAudioTrack(localAudioTrack);
    client.publish(localAudioTrack);

    const user = await getUserByUid({
      uid: uid,
    });

    await addPlayer({
      id: user._id,
      uid: uid,
      squadId: squad._id,
      name: user.name,
      imageUrl: user.imageUrl,
    });

    // setRoomUsers((prev) => [
    //   ...prev,
    //   {
    //     name: uid,
    //   },
    // ]);

    setMicPermission(true);
  };

  const leaveRoom = async () => {
    if (!currentUserId) return;

    audioTrack?.stop();
    audioTrack?.close();

    client.unpublish();
    client.leave();

    removePlayer({
      squadId: squad._id,
      uid: currentUserId,
    });

    // setRoomUsers((prev) => prev.filter((user) => user.name !== currentUserId));

    setMicPermission(false);
  };

  return (
    <div>
      <div className="p-2 text-lg font-semibold">Voice Chat</div>
      <div className="p-10 border rounded-lg mt-2 flex gap-6 relative">
        {micPermission ? (
          <Button
            className="absolute top-2 right-2"
            size="sm"
            variant="ghost"
            onClick={leaveRoom}
          >
            <DoorOpen />
          </Button>
        ) : (
          <Button
            className="absolute top-2 right-2"
            size="sm"
            variant="ghost"
            onClick={enterRoom}
          >
            <Plus />
          </Button>
        )}
        {squad.players.map((player) => (
          <VoiceChatItem
            key={player.id}
            name={player.name}
            imageUrl={player.imageUrl}
            id={player.id}
            uid={player.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default VoiceChat;
