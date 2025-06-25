import api from "@/api/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useProgressStore = create((set) => ({
  progresses: [],
  isFetching: false,
  loading: false,

  createProgress: async (formData) => {
    set({ loading: true });

    try {
      const res = await api.post("/progress", formData);
      toast.success(res.data.message);
      set((prev) => ({
        progresses: [...prev.progresses, res.data.progress],
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  getProgressData: async () => {
    set({ isFetching: true });

    try {
      const res = await api.get("/progress");
      set({ progresses: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isFetching: false });
    }
  },

  updateProgress: async (progressId, formData) => {
    set({ loading: true });

    try {
      const res = await api.put(`/progress/${progressId}`, formData);
      toast.success(res.data.message);
      const updated = res.data.progress;

      set((prev) => ({
        progresses: prev.progresses.map((prg) =>
          prg._id === updated._id ? updated : prg
        ),
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  deleteProgress: async (progressId) => {
    set({ loading: true });

    try {
      const res = await api.delete(`/progress/${progressId}`);
      toast.success(res.data.message);
      set((prev) => ({
        progresses: prev.progresses.filter((prg) => prg._id !== progressId),
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  exportProgressToPDF: async () => {
    set({ loading: true });

    try {
      const res = await api.post(
        "/progress/export",
        {},
        {
          responseType: "blob",
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return res.data;
    } catch (error) {
      console.error(error);
      toast.error("PDF indirilemedi");
    } finally {
      set({ loading: false });
    }
  },
}));
