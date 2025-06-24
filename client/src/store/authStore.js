import { create } from "zustand";
import { toast } from "sonner";
import api from "@/api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  isChecking: true,
  isRegistering: false,
  isLogging: false,

  setUser: (newUser) => set({ user: newUser }),

  register: async (formData) => {
    set({ isRegistering: true });

    try {
      const res = await api.post("/auth/register", formData);
      set({ user: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isRegistering: false });
    }
  },

  login: async (formData) => {
    set({ isLogging: true });

    try {
      const res = await api.post("/auth/login", formData);
      set({ user: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isLogging: false });
    }
  },

  logout: async () => {
    await api.post("/auth/logout");
    set({ user: null });
  },

  checkAuth: async () => {
    set({ isChecking: true });
    try {
      const res = await api.get("/auth/me");
      set({ user: res.data.user });
    } catch (error) {
      console.error(error);
      set({ user: null });
    } finally {
      set({ isChecking: false });
    }
  },
}));
