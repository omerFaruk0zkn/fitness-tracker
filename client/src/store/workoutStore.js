import { create } from "zustand";
import { toast } from "sonner";
import api from "@/api/axios";

export const useWorkoutStore = create((set) => ({
  workout: null,
  isFetching: false,
  loading: false,

  addWorkout: async (formData) => {
    set({ loading: true });

    try {
      const res = await api.post("/workouts", formData);
      toast.success(res.data.message);
      set({ workout: res.data.workout });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  updateWorkout: async (formData) => {
    set({ loading: true });

    try {
      const res = await api.put("/workouts", formData);
      toast.success(res.data.message);
      if (res.data.workout.exercises.length === 0) {
        set({ workout: null });
      } else {
        set({ workout: res.data.workout });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  getWorkoutByDate: async (date) => {
    set({ isFetching: true });

    try {
      const res = await api.get(`/workouts/${date}`);
      if (!res.data?.exercises || res.data?.exercises.length === 0) {
        set({ workout: null });
      } else {
        set({ workout: res.data });
      }
    } catch {
      return;
    } finally {
      set({ isFetching: false });
    }
  },

  deleteWokoutItem: async (date, exerciseId) => {
    set({ loading: true });

    try {
      const res = await api.put(`/workouts/${date}/${exerciseId}`);
      toast.success(res.data.message);
      if (res.data.workout.exercises.length === 0) {
        set({ workout: null });
      } else {
        set({ workout: res.data.workout });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  updateProgress: async (workoutId, exerciseId) => {
    set({ loading: true });

    try {
      const res = await api.patch(`/workouts/progress/${workoutId}`, {
        exerciseId,
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },
}));
