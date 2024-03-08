import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";

type VoiceChatItemProps = {
  id: Id<"users">;
  name: string;
  imageUrl: string;
};

const VoiceChatItem = ({ id, name, imageUrl }: VoiceChatItemProps) => {
  const [muted, setMuted] = useState(false);

  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>Image</AvatarFallback>
        </Avatar>
        <div className="text-lg font-semibold">{name}</div>
      </div>
    </div>
  );
};

export default VoiceChatItem;
