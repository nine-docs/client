import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

type ModalState = {
  isModalOpen: boolean;
  component: React.ReactNode | null;
};

const store: StateCreator<ModalState> = (set, get) => ({
  isModalOpen: false,
  component: null,

  openModal: (component: React.ReactNode) =>
    set({ isModalOpen: true, component: component }),
  closeModal: () => set({ isModalOpen: false, component: null }),
});

export const modalStore = create(devtools(store, { name: "modalStore" }));
