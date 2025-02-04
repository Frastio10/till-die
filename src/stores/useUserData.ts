import { create } from "zustand";

interface UserData {
  birth: string | number;
  expectedAge: number;
  isGenerated: boolean;
  setBirth: (birth: string | number) => void;
  setExpectedAge: (age: number) => void;
  setIsGenerated: (isGenerated: boolean) => void;
}

export const useUserStore = create<UserData>()((set) => ({
  birth: "08/10/2003",
  expectedAge: 40,
  isGenerated: false,
  setBirth: (birth) => set(() => ({ birth })),
  setExpectedAge: (age) => set(() => ({ expectedAge: age })),
  setIsGenerated: (isGenerated) => set(() => ({ isGenerated: isGenerated })),
}));
