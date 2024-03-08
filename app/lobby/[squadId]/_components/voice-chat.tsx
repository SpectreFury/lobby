import React, { useState, useEffect } from "react";
import VoiceChatItem from "./voice-chat-item";
import { Plus, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";

type Player = {
  id: Id<"users">;
  name: string;
  imageUrl: string;
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
  joinVoice: () => void;
  leaveVoice: () => void;
};

const VoiceChat = ({ squad, joinVoice, leaveVoice }: VoiceChatProps) => {
  const [micPermission, setMicPermission] = useState(false);

  return (
    <div>
      <div className="p-10 border rounded-lg mt-2 flex gap-6 relative">
        {micPermission ? (
          <Button
            className="absolute top-2 right-2"
            size="sm"
            variant="ghost"
            onClick={() => {
              setMicPermission(false);
              leaveVoice();
            }}
          >
            <DoorOpen />
          </Button>
        ) : (
          <Button
            className="absolute top-2 right-2"
            size="sm"
            variant="ghost"
            onClick={() => {
              setMicPermission(true);
              joinVoice();
            }}
          >
            <Plus />
          </Button>
        )}
        {squad.players.length === 0 && (
          <div className="w-full flex justify-center items-center">
            <Image
              src="/dog-light.svg"
              width={200}
              height={200}
              alt="A dog illustration"
              className="dark:hidden"
            />
            <Image
              src="/dog-dark.svg"
              width={200}
              height={200}
              alt="A dog illustration"
              className="hidden dark:block"
            />
          </div>
        )}
        {squad.players.map((player) => (
          <VoiceChatItem
            key={player.id}
            name={player.name}
            imageUrl={player.imageUrl}
            id={player.id}
            // volumeStatus={volumeLevels[player.uid]}
          />
        ))}
      </div>
    </div>
  );
};

export default VoiceChat;
