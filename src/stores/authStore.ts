// store/authStore.ts
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
};

const store: StateCreator<AuthState> = (set, get) => ({
  token: "",
  setToken: (token: string) => set({ token: token }),
});

const persistStore = persist(store, { name: "authStore" });

export const useAuthStore = create(
  devtools(persistStore, { name: "authStore" }),
);
