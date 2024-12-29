// store/authStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
};

const store = () => {};

export const useAuthStore = create(store);
