import { create } from 'zustand';

type MenuStoreState = {
  isFormOpen: boolean;
  editingMenuId: string | null;
  openForm: (menuId?: string) => void;
  closeForm: () => void;
};
export const useMenuStore = create<MenuStoreState>((set) => ({
  isFormOpen: false,
  editingMenuId: null,
  openForm: (menuId) =>
    set({ isFormOpen: true, editingMenuId: menuId || null }),
  closeForm: () => set({ isFormOpen: false, editingMenuId: null }),
}));
