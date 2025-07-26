import { useNavigate } from "react-router-dom";
import { ChevronDown, LogInIcon, Moon, Settings, Sun, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { useUserStore } from "../store/useUserStore.js";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 font-sans">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 md:px-6 lg:px-8">
        {/* LOGO - LEFT SIDE */}
        <div
          className="flex items-center gap-1 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 shadow-lg group-hover:shadow-purple-300/50">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-500 to-purple-800 bg-clip-text text-transparent">
            TaskPilot
          </h1>
        </div>

        {/* RIGHT SIDE SECTION */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="p-2 text-gray-600 hover:text-purple-500 transition-colors duration-200 hover:bg-purple-50 rounded-full cursor-pointer">
            {/* <Moon className="w-5 h-5" /> */}
            <Sun className="w-5 h-5" />
          </button>

          {/* USER DROPDOWN */}
          {user && (
            <div ref={menuRef} className="relative">
              <button
                onClick={handleMenuToggle}
                className="flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer hover:bg-purple-50 transition-colors duration-200"
              >
                <div className="relative">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-9 rounded-full shadow-sm"
                    />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 text-white font-semibold shadow-md">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}

                  {/* LOGGEGIN INDICATOR */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white animate-pulse" />
                </div>

                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium text-gray-800">
                    {user?.name}
                  </p>
                  <p className="text-xs font-normal text-gray-500 -mt-1">
                    {user?.email}
                  </p>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {menuOpen && (
                <ul className="absolute top-14 right-0 w-56 bg-white rounded-2xl shadow-xl border border-purple-100 z-50 overflow-hidden animate-fadeIn">
                  <li className="p-2">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full px-4 py-2.5 text-left hover:bg-purple-50 text-sm text-gray-700 transition-colors flex items-center gap-2 cursor-pointer rounded-xl group"
                      role="menuitem"
                    >
                      <Settings className="w-4 h-4 text-gray-700" />
                      Profile Setting
                    </button>
                  </li>

                  <li className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left hover:bg-red-50 text-sm text-red-600 transition-colors flex items-center gap-2 cursor-pointer rounded-xl group"
                      role="logout"
                    >
                      <LogInIcon className="w-4 h-4 text-red-600" />
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
