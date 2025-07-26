import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore.js";
import { Menu, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import { menuItems } from "../constants/index.js";

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const { user } = useUserStore();

  const initial = user?.name?.charAt(0).toUpperCase() || "U";

  const renderMenuItems = (mobileOpen = false) => (
    <ul className="space-y-2">
      {menuItems.map((item) => (
        <li key={item.text}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center px-4 py-3 rounded-xl transition-all duration-300 
              ${isActive ? "bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white" : "hover:bg-purple-100 text-gray-600 hover:text-purple-700 border border-purple-200"
              } ${mobileOpen ? "justify-start" : "lg:justify-start"}`
            }
            onClick={() => setMobileOpen(false)}
          >
            <item.icon className="w-5 h-5" />
            <span className={`${mobileOpen ? "block" : "hidden lg:block"} text-sm font-medium ml-2`}>
              {item.text}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [mobileOpen]);

  return (
    <>
      {/* SIDEBAR FOR DESKTOP */}
      <div className="hidden md:flex flex-col fixed h-full w-20 lg:w-64 bg-white/90 backdrop-blur-sm border-r border-purple-100 shadow-sm z-20 transition-all duration-300">
        <div className="p-5 border-b border-purple-100 hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
              {initial}
            </div>

            <div className="relative">
              <h2 className="text-sm font-bold text-gray-700 capitalize">
                Hey, {user?.name?.split(" ")[0]}
              </h2>
              <p className="text-xs text-purple-500 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Let's crush some tasks!
              </p>
            </div>
          </div>
        </div>

        {/* MENU LINKS */}
        <div className="p-4 space-y-6 overflow-auto flex-1">
          {renderMenuItems()}
        </div>
      </div>

      {/* MOBILE MENU */}
      {!mobileOpen && (
        <button
          className="absolute md:hidden top-22 left-5 z-40 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 mt-18">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          <div 
            className="absolute top-0 left-0 w-64 h-full bg-white/90 backdrop-blur-md border-r border-purple-100 shadow-lg z-50 p-4 flex flex-col space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                {initial}
              </div>

              <div className="relative">
                <h2 className="text-sm font-bold text-gray-700 capitalize">
                  Hey, {user?.name?.split(" ")[0]}
                </h2>
                <p className="text-xs text-purple-500 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Let's crush some tasks!
                </p>
              </div>
            </div>

            {/* MENU LINKS */}
            {renderMenuItems(true)}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
