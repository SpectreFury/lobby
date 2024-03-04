import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  toggleOpen: () => void;
  setIsOpen: (value: boolean) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsOpen: (value: boolean) => set({ isOpen: value }),
}));

export { useModalStore };