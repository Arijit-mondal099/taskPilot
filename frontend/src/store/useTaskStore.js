import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  isTasksLoading: false,

  fetchTasks: async () => {
    try {
      set({ isTasksLoading: true });
      const { data } = await axiosInstance.get("/api/tasks/gp");
      set({ tasks: data?.tasks });
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      set({ tasks: [] });
    } finally {
      set({ isTasksLoading: false });
    }
  },

  createTask: async (cradentails) => {
    try {
      const { data } = await axiosInstance.post("/api/tasks/gp", cradentails);
      set({ tasks: [ data?.task, ...get().tasks ]})
      toast.success("Task created successfully");
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  },

  updateTask: async (id, data) => {
    try {
      await axiosInstance.put(`/api/tasks/${id}`, data);
      set({ tasks: get().tasks.map(t => t._id === id ? { ...t, ...data } : t)});
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  },

  deleteTask: async (id) => {
    try {
      await axiosInstance.delete(`/api/tasks/${id}`);
      set({ tasks: get().tasks.filter(t => t._id !== id)});
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  },
}));
