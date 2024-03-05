import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";

type VoiceChatItemProps = {
  id: Id<"users">;
  uid: string | number;
  name: string;
  imageUrl: string;
  audioTrack?: any;
};

const VoiceChatItem = ({
  id,
  uid,
  name,
  imageUrl,
  audioTrack,
}: VoiceChatItemProps) => {
  return (
    <div className="border rounded-lg gap-2 p-2 flex flex-col">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>Image</AvatarFallback>
        </Avatar>
        <div className="text-lg font-semibold">{name}</div>
      </div>
      <Button variant="ghost" className="self-center">
        <Mic />
      </Button>
    </div>
  );
};

export default VoiceChatItem;
