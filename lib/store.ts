import { create } from "zustand";
import { shallow } from 'zustand/shallow';

export type LayoutState = 'default' | 'menu' | 'title' | 'project'

export interface StoreState {
  layoutState: LayoutState
  setLayoutState: (layoutState: LayoutState) => void,
}

const useStore = create<StoreState>((set) => ({
  layoutState: 'default',
  setLayoutState: (layoutState: LayoutState) => set((state) => ({ layoutState })),
}));

export { shallow, useStore };
