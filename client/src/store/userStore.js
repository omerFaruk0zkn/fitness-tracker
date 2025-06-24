import { create } from "zustand";
import { toast } from "sonner";
import api from "@/api/axios";

export const useUserStore = create((set) => ({
  loading: false,

  editProfile: async (formData) => {
    set({ loading: true });

    try {
      const res = await api.put("/users/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },
}));
