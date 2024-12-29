import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type AuthState = {
  token: string;
  accessTokenExpiredAt: string;
  setAuthInfo: (token: string, accessTokenExpiredAt: string) => void;
  deleteAuthInfo: () => void;
};

const store: StateCreator<AuthState> = (set, get) => ({
  token: "",
  accessTokenExpiredAt: "",
  setAuthInfo: (token: string, accessTokenExpiredAt: string) =>
    set({ token: token, accessTokenExpiredAt: accessTokenExpiredAt }),
  deleteAuthInfo: () => set({ token: "", accessTokenExpiredAt: "" }),
});

const persistStore = persist(store, { name: "authStore" });

export const useAuthStore = create(
  devtools(persistStore, { name: "authStore" }),
);
