import React from 'react'
import { logout } from "../../services/authService";
import { NavLink, useNavigate } from 'react-router-dom'
import useUser from "../../hooks/useUser";
import { Home, CheckSquare, Clock, Folder, Users, Settings } from 'lucide-react'

const menus = [
  { to: '/', label: 'Dashboard', icon: <Home size={16} /> },
  { to: '/tasks', label: 'Tasks', icon: <CheckSquare size={16} /> },
  { to: '/activities', label: 'Activities', icon: <Clock size={16} /> },
  { to: '/projects', label: 'Projects', icon: <Folder size={16} /> },
  { to: '/employees', label: 'Employees', icon: <Users size={16} /> },
  { to: '/settings', label: 'Settings', icon: <Settings size={16} /> },
]

export default function Sidebar() {
  const navigate = useNavigate();
  const user = useUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-72 bg-[#071017] border-r border-gray-800 text-sm text-muted h-screen flex flex-col">

      {/* Brand */}
      <div className="px-6 py-5 flex items-center gap-3 border-b border-gray-800">
        <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center font-semibold">PM</div>
        <div>
          <div className="text-white font-semibold">PMIS</div>
          <div className="text-xs text-muted">Project Management</div>
        </div>
      </div>

      {/* Menus */}
      <nav className="p-4 space-y-1">
        {menus.map(m => (
          <NavLink
            key={m.to}
            to={m.to}
            className={({isActive}) =>
              `flex items-center gap-3 p-2 rounded ${
                isActive ? "bg-accent/20 text-accent" : "text-muted hover:bg-gray-900"
              }`
            }
          >
            <div className="opacity-90">{m.icon}</div>
            <div>{m.label}</div>
          </NavLink>
        ))}
      </nav>

      {/* Push Bottom Section Down */}
      <div className="mt-auto px-4 pb-6 space-y-4">

        {/* User section */}
        <button
          onClick={() => navigate("/profile")}
          className="w-full card flex items-center gap-3 text-left"
        >
          <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center">
            {user ? user.name?.substring(0, 2).toUpperCase() : "US"}
          </div>
          <div>
            <div className="text-sm font-medium">{user?.name || "Loading..."}</div>
            <div className="text-xs text-muted">{user?.email || ""}</div>
          </div>
        </button>

        {/* Logout button (centered horizontally) */}
        <div className="flex justify-center">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded w-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
