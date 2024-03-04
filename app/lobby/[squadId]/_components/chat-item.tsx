import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/store/useChatStore";

type ChatItemProps = {
  user: User;
  content?: string;
  type: "MESSAGE" | "NOTIFICATION";
};

const ChatItem = ({ user, content, type }: ChatItemProps) => {
  if (type === "MESSAGE")
    return (
      <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900">
        <Avatar>
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>Image</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-gray-700 dark:text-gray-300">
              {`${user.firstName} ${user.lastName}`}
            </div>
            <div className="text-xs font-light">03/02/2024 9:55 PM</div>
          </div>
          <div className="dark:text-muted-foreground">{content}</div>
        </div>
      </div>
    );
  if (type === "NOTIFICATION") {
    return (
      <div className="text-muted-foreground font-semibold text-center">
        {`${user.firstName} ${user.lastName} joined`}
      </div>
    );
  }
};

export default ChatItem;
