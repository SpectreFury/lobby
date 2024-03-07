import React from "react";
import ChatItem from "./chat-item";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useChatStore } from "@/store/useChatStore";

const ChatBox = () => {
  const { messages } = useChatStore();

  return (
    <div className="flex-1">
      <ScrollArea className="max-h-[500px]">
        {messages.map((message) => (
          <ChatItem
            key={message.user.firstName}
            user={message.user}
            content={message.content}
            type={message.type}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatBox;
