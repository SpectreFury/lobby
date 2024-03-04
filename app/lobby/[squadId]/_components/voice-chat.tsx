import React from "react";

import VoiceChatItem from "./voice-chat-item";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";

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
};

const VoiceChat = ({ squad }: VoiceChatProps) => {
  return (
    <div>
      <div className="p-2 text-lg font-semibold">Voice Chat</div>
      <div className="p-10 border rounded-lg mt-2 flex gap-6 relative">
        <Button className="absolute top-2 right-2" size="sm" variant="ghost">
          <Plus />
        </Button>
        {squad.players.map((player) => (
          <VoiceChatItem
            key={player.id}
            name={player.name}
            imageUrl={player.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default VoiceChat;
