import { useState } from "react";
import { useUserStore } from "../store/useUserStore.js";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLogin } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg w-96 rounded-lg border border-purple-100"
      >
        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-0.5 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-base text-gray-500">Sign in to your free account</p>
        </div>

        {/* EMAIL INPUT */}
        <div className="mb-4 relative">
          <input
            type="email"
            value={email}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-md pl-10 outline-none border border-gray-200 focus:border-gray-500"
            required
          />
          <Mail className="absolute h-5 w-5 left-3 top-2.5 text-purple-400" />
        </div>

        {/* PASSWORD INPUT */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-md pl-10 outline-none border border-gray-200 focus:border-gray-500"
            required
          />

          <Lock className="absolute h-5 w-5 left-3 top-2.5 text-purple-400" />
          {showPassword ? (
            <EyeOff
              className="absolute h-5 w-5 right-3 top-2.5 text-purple-400 cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <Eye
              className="absolute h-5 w-5 right-3 top-2.5 text-purple-400 cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isLogin}
          className={`w-full bg-purple-500 text-white py-2 rounded-md cursor-pointer hover:bg-purple-700 transition-colors duration-200 ${
            isLogin ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLogin ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" />
              Loading...
            </div>
          ) : (
            "Login"
          )}
        </button>

        <div className="text-left mt-4">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
