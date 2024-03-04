import React from "react";
import ChatItem from "./chat-item";

import { useChatStore } from "@/store/useChatStore";

const ChatBox = () => {
  const { messages } = useChatStore();

  return (
    <div className="flex-1">
      {messages.map((message) => (
        <ChatItem
          key={message.user.firstName}
          user={message.user}
          content={message.content}
          type={message.type}
        />
      ))}
    </div>
  );
};

export default ChatBox;
