import type { AppSliceCreator } from '../../store';

export interface UiSlice {
  q: {
    toast: {
      type: 'Error' | 'Success';
      message: string;
    } | null;
  };
  setToast: (
    type: Exclude<UiSlice['ui']['toast'], null>['type'],
    message: string,
  ) => void;
  clearToast: () => void;
}

export const createUiSlice: AppSliceCreator<UiSlice> = (set, get) => ({
  ui: {
    toast: null,
  },

  setToast: (type, message) => {
    set((state) => {
      state.ui.toast = { type, message };
    });

    setTimeout(() => {
      get().clearToast();
    }, 3_000);
  },

  clearToast: () => {
    set((state) => {
      state.ui.toast = null;
    });
  },
});
