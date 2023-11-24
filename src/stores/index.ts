import { EventData } from "@/types";
import { create } from "zustand";

interface Store {
  currentEvent: EventData| null;
  setCurrentEvent: (event: EventData | null) => void;
}

export const useEvent = create<Store>()((set) => ({
  currentEvent: null,
  setCurrentEvent: (event) => set(() => ({ currentEvent: event })),
}));
