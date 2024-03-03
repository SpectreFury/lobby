import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

const ChatItem = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900">
      <Avatar>
        <AvatarImage src={user?.imageUrl} />
        <AvatarFallback>Image</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center gap-2">
          <div className="font-semibold text-gray-700 dark:text-gray-300">
            SpectreFury
          </div>
          <div className="text-xs font-light">03/02/2024 9:55 PM</div>
        </div>
        <div className="dark:text-muted-foreground">
          Something really cool was written over here, but now it is deleted and
          it can't be recovered
        </div>
      </div>
    </div>
  );
};

export default ChatItem;