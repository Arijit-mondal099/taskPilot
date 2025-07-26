import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: null,
  isCheckingAuth: false,
  isLogin: false,
  isRegister: false,
  isProfileUpdateing: false,
  isPasswordUpdateing: false,

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const { data } = await axiosInstance.get("/api/users/current");
      set({ user: data?.user });
    } catch (error) {
      set({ user: null });
      console.error(error.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async (credentials) => {
    try {
      set({ isRegister: true });
      const { data } = await axiosInstance.post("/api/users/register", credentials);
      set({ user: data?.user });
      toast.success(data?.message);
    } catch (error) {
      toast.error(error.response.data.message);
      set({ user: null });
    } finally {
      set({ isRegister: false });
    }
  },

  login: async (credentials) => {
    try {
      set({ isLogin: true });
      const { data } = await axiosInstance.post("/api/users/login", credentials);
      set({ user: data?.user });
      toast.success(data?.message);
    } catch (error) {
      toast.error(error.response.data.message);
      set({ user: null });
    } finally {
      set({ isLogin: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/api/users/logout");
      set({ user: null });
      toast.success("Logout successfully");
    } catch (error) {
      toast.error(error.response.data?.message || error.message);
      set({ user: null });
    }
  },

  updateProfile: async (credentials) => {
    try {
      set({ isProfileUpdateing: true });
      const { data } = await axiosInstance.put("/api/users/update", credentials);
      set({ user: data?.user });
      toast.success("Profile pudated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isProfileUpdateing: false });
    }
  },

  updatePassword: async (credentials) => {
    try {
      set({ isPasswordUpdateing: true });
      await axiosInstance.put("/api/users/change-password", credentials);
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isPasswordUpdateing: false });
    }
  },
}));
