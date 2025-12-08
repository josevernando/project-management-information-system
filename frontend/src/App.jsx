import React from "react";
import { Routes, Route } from "react-router-dom";

import Shell from "./components/Shell";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Activities from "./pages/Activities";
import Projects from "./pages/Projects";
import Employees from "./pages/Employees";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./services/PrivateRoute";

export default function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Shell */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Shell />
          </PrivateRoute>
        }
      >

        {/* Pages inside Shell */}
        <Route index element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="activities" element={<Activities />} />
        <Route path="projects" element={<Projects />} />
        <Route path="employees" element={<Employees />} />
        <Route path="settings" element={<Settings />} />

      </Route>
    </Routes>
  );
}
