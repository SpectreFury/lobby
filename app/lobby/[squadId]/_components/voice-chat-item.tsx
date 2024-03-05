import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { IMicrophoneAudioTrack, UID } from "agora-rtc-react";

type VoiceChatItemProps = {
  id: Id<"users">;
  uid: string | number;
  name: string;
  imageUrl: string;
  audioTrack?: IMicrophoneAudioTrack | null;
  volumeStatus?: "talking" | "resting";
  currentUserId: UID | undefined;
};

const VoiceChatItem = ({
  id,
  uid,
  name,
  imageUrl,
  audioTrack,
  volumeStatus,
  currentUserId,
}: VoiceChatItemProps) => {
  const [muted, setMuted] = useState(false);

  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  useEffect(() => {
    if (!currentUserId || currentUserId !== uid) return;

    audioTrack?.setMuted(muted);
  }, [muted]);

  return (
    <div
      className={`${
        volumeStatus === "talking" ? " border border-emerald-700" : "border"
      }  rounded-lg gap-2 p-2 flex flex-col`}
    >
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>Image</AvatarFallback>
        </Avatar>
        <div className="text-lg font-semibold">{name}</div>
      </div>
      {muted ? (
        <Button
          variant="ghost"
          className="self-center"
          onClick={toggleMute}
          disabled={currentUserId !== uid}
        >
          <MicOff />
        </Button>
      ) : (
        <Button
          variant="ghost"
          className="self-center"
          onClick={toggleMute}
          disabled={currentUserId !== uid}
        >
          <Mic />
        </Button>
      )}
    </div>
  );
};

export default VoiceChatItem;
