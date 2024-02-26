import { create } from "zustand";
import { shallow } from 'zustand/shallow';

export type MenuState = 'inactive' | 'active' | 'hidden'
export interface StoreState {
  menuState: MenuState
  setMenuState: (menuState: MenuState) => void,
}

const useStore = create<StoreState>((set) => ({
  menuState: 'inactive',
  setMenuState: (menuState: MenuState) => set((state) => ({ menuState })),
}));

export { shallow, useStore };
