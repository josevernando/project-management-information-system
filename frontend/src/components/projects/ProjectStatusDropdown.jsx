import React, { useState } from "react";
import { updateProjectStatus } from "../../services/projectService";

const PROJECT_STATUS_OPTIONS = [
  { value: "active", label: "Planned" },
  { value: "paused", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function ProjectStatusDropdown({ project }) {
  const [status, setStatus] = useState(project.status);

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    await updateProjectStatus(project.id, newStatus);
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      className="bg-gray-800 text-sm rounded px-2 py-1 border border-gray-700"
    >
      {PROJECT_STATUS_OPTIONS.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}

