import { create } from "zustand";
import { shallow } from 'zustand/shallow';

export type LayoutState = 'default' | 'menu' | 'meta' | 'info'

export interface StoreState {
  layoutState: LayoutState
  desktop: boolean
  setLayoutState: (layoutState: LayoutState) => void,
  setDesktop: (desktop: boolean) => void,
}

const useStore = create<StoreState>((set) => ({
  layoutState: 'default',
  desktop: false,
  setLayoutState: (layoutState: LayoutState) => {
    set((state) => ({ layoutState: state.desktop ? layoutState : 'default' }))
  },
  setDesktop: (desktop: boolean) => {
    set((state) => ({ desktop }))
  },
}));

export { shallow, useStore };
