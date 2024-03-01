import { create } from "zustand";
import { shallow } from 'zustand/shallow';

export type LayoutState = 'default' | 'menu' | 'meta' | 'info'

export interface StoreState {
  layoutState: LayoutState,
  desktop: boolean,
  showMobileMenu: boolean,
  setShowMobileMenu: (showMobileMenu: boolean) => void,
  setLayoutState: (layoutState: LayoutState) => void,
  setDesktop: (desktop: boolean) => void
}

const useStore = create<StoreState>((set) => ({
  layoutState: 'default',
  desktop: false,
  showMobileMenu: false,
  setLayoutState: (layoutState: LayoutState) => {
    set((state) => ({ layoutState: state.desktop ? layoutState : 'default' }))
  },
  setShowMobileMenu: (showMobileMenu: boolean) => {
    set((state) => ({ showMobileMenu }))
  },
  setDesktop: (desktop: boolean) => {
    set((state) => ({ desktop }))
  },
}));

export { shallow, useStore };
