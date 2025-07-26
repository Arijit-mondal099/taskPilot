import React, { useState } from "react";
import { ChevronLeft, Eye, EyeOff, Loader2, Lock, LogOut, Mail, Save, Shield, User, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore.js";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, updateProfile, isProfileUpdateing, updatePassword, isPasswordUpdateing, logout } = useUserStore();
  const [profile, setProfile] = useState({
    name: user?.name,
    email: user?.email,
  });
  const [password, setPassword] = useState({ curr: "", new: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile(profile);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      toast.error("Invalid confirm password");
      return;
    }

    updatePassword({ currentPassword: password.curr, newPassword: password.new });
    setPassword({ curr: "", new: "", confirm: "" });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  }

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-4xl mx-auto p-2 md:p-6">
        {/* BACK BUTTON */}
        <button
          className="flex items-center text-gray-600 hover:text-purple-600 mb-8 transition-colors duration-200 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Dashboard
        </button>

        {/* HEADING */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="relative">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">
              Account Setting
            </h1>
            <p className="text-sm text-gray-500">
              Manage your profile and security settings
            </p>
          </div>
        </div>

        {/* NAME, EMAIL & PASSWORD UPDATE SECTION */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* name, email */}
          <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
            <div className="flex items-center gap-2 mb-6">
              <UserCircle className="text-purple-500 w-6 h-6" />
              <h2 className="text-xl font-semibold text-gray-700">
                Presonal Information
              </h2>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="mb-4 relative">
                <input
                  type="text"
                  value={profile.name}
                  placeholder="Full Name"
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-md pl-10 outline-none border border-gray-200 focus:border-gray-500"
                />
                <User className="absolute h-5 w-5 left-3 top-2.5 text-purple-400" />
              </div>

              <div className="mb-4 relative">
                <input
                  type="email"
                  value={profile.email}
                  placeholder="Email Address"
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-md pl-10 outline-none border border-gray-200 focus:border-gray-500"
                />
                <Mail className="absolute h-5 w-5 left-3 top-2.5 text-purple-400" />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white py-2.5 rounded-lg hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProfileUpdateing ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updateing...
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save Changes
                  </>
                )}
              </button>
            </form>
          </div>

          {/* password */}
          <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="text-purple-500 w-6 h-6" />
              <h2 className="text-xl font-semibold text-gray-700">Security</h2>
            </div>

            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Old Password"
                  value={password.curr}
                  onChange={(e) =>
                    setPassword({ ...password, curr: e.target.value })
                  }
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

              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={password.new}
                  onChange={(e) =>
                    setPassword({ ...password, new: e.target.value })
                  }
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

              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={password.confirm}
                  onChange={(e) =>
                    setPassword({ ...password, confirm: e.target.value })
                  }
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

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white py-2.5 rounded-lg hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isPasswordUpdateing ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Chnageing...
                  </div>
                ) : (
                  <>
                    <Shield className="w-4 h-4" /> Change Password
                  </>
                )}
              </button>

              <div className="mt-8">
                <div className="flex items-center gap-2 text-red-500 mb-4">
                  <LogOut className="w-5 h-5" />
                  <p className="text-sm font-medium">Danger Zone</p>
                </div>

                <button className="w-full border border-red-500 text-red-500 bg-red-50 py-2.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
