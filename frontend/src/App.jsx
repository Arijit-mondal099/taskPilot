import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUserStore } from "./store/useUserStore.js";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PendingPage from "./pages/PendingPage";
import ProfilePage from "./pages/ProfilePage";
import CompletePage from "./pages/CompletePage";

const App = () => {
  const { user, checkAuth, isCheckingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="text-purple-500 text-2xl animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <HomePage/ > : <Navigate to={"/login"} replace />}>
          <Route path="" element={<DashboardPage />} />
          <Route path="/pending" element={<PendingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/complete" element={<CompletePage />} />
        </Route>

        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} replace />}/>
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to={"/"} replace />}/>
        <Route path="*" element={user ? <HomePage /> : <Navigate to={"/login"} replace />} />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
