import { create } from "zustand";
import { toast } from "sonner";
import api from "@/api/axios";

export const useExerciseStore = create((set) => ({
  exercises: [],
  total: 0,
  page: 1,
  pages: 0,
  loading: false,
  isAddedExercise: false,
  isDeletedExercise: false,
  isUpdatedExercise: false,

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

  getAllExercise: async (page = 1, limit = 8) => {
    set({ loading: true });

    try {
      const res = await api.get(`/exercises?page=${page}&limit=${limit}`);

      set({
        exercises: res.data.exercises,
        total: res.data.total,
        page: res.data.page,
        pages: res.data.pages,
      });
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

  updateExercise: async (exerciseId, formData) => {
    set({ isUpdatedExercise: true });

    try {
      const res = await api.put(`/exercises/${exerciseId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);

      set((prev) => ({
        exercises: prev.exercises.map((exercise) =>
          exercise._id === exerciseId ? res.data.exercise : exercise
        ),
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isUpdatedExercise: false });
    }
  },
}));
