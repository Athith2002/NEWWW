import { create } from "zustand";

const useAuthStore = create()((set) => ({
  user: null,
  loginError: null,
  registerError: null,
  fetchUserLoading: true,
  emailPaswordLoading: false,
  passwordResetLoading: false,
  resendEmailOTPTimer: false,

  setUser: (user) => {
    set((state) => ({
      ...state,
      user: user,
    }));
  },

  setLoginError: (params) => {
    set((state) => ({
      ...state,
      loginError: params
        ? { code: params.code, message: params.message }
        : null,
    }));
  },

  setRegisterError: (params) => {
    set((state) => ({
      ...state,
      registerError: params
        ? { code: params.code, message: params.message }
        : null,
    }));
  },

  setFetchUserLoading: (value) => {
    set((state) => ({
      ...state,
      fetchUserLoading: value,
    }));
  },

  setEmailPasswordLoading: (value) => {
    set((state) => ({
      ...state,
      emailPaswordLoading: value,
    }));
  },

  setPasswordResetLoading: (value) => {
    set((state) => ({
      ...state,
      passwordResetLoading: value,
    }));
  },

  setResendEmailOTPTimer: (value) => {
    set((state) => ({
      ...state,
      resendEmailOTPTimer: value,
    }));
  },
}));

export default useAuthStore;
