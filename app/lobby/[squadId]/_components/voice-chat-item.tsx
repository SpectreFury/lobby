import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

type VoiceChatItemProps = {
  _id?: string;
  name: string;
  imageUrl: string;
};

const VoiceChatItem = ({ _id, name, imageUrl }: VoiceChatItemProps) => {
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
