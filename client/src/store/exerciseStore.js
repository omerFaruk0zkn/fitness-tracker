import { create } from "zustand";
import { toast } from "sonner";
import api from "@/api/axios";

export const useExerciseStore = create((set) => ({
  exercises: [],
  loading: false,
  isAddedExercise: false,
  isDeletedExercise: false,

  addExercise: async (formData) => {
    set({ isAddedExercise: true });

    try {
      const res = await api.post("/exercises", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
      set((prev) => ({
        exercises: [res.data.exercise, ...prev.exercises],
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isAddedExercise: false });
    }
  },

  getAllExercise: async () => {
    set({ loading: true });

    try {
      const res = await api.get("/exercises");
      set({ exercises: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  deleteExerciseById: async (exerciseId) => {
    set({ isDeletedExercise: true });

    try {
      const res = await api.delete(`/exercises/${exerciseId}`);
      toast.success(res.data.message);

      set((prev) => ({
        exercises: prev.exercises.filter(
          (exercise) => exercise._id !== exerciseId
        ),
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isDeletedExercise: false });
    }
  },
}));
