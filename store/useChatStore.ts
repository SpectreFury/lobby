import { create } from "zustand";

export type User = {
  firstName: string;
  lastName: string;
  imageUrl: string;
};

type Message = {
  type: "NOTIFICATION" | "MESSAGE";
  user: User;
  content?: string;
};

interface ChatStore {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

const useChatStore = create<ChatStore>((set) => ({
  messages: [
    {
      type: "MESSAGE",
      user: {
        firstName: "Ayush",
        lastName: "Soni",
        imageUrl:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZDg2aTZOdWlpRW4zdFpCeG56WjlsZjBtWW0ifQ",
      },
      content:
        "Something really cool was written over here, but now it is deleted and it cannot be recovered",
    },
  ],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  clearMessages: () => set((state) => ({ messages: [] })),
}));

export { useChatStore };
