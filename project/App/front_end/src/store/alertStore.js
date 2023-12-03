import { create } from "zustand";

const useAlertStore = create()((set) => ({
  alerts: [],
  setAlert: (alert) => {
    set((state) => ({ ...state, alerts: [alert, ...state.alerts] }));
  },

  removeAlert: (id) => {
    set((state) => ({
      ...state,
      alerts: state.alerts.filter((alert) => alert.id !== id),
    }));
  },
}));

export default useAlertStore;
