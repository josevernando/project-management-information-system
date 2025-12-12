import React, { useState } from "react";
import { updateTaskStatus } from "../../services/taskService";

const STATUS_OPTIONS = [
  { value: "To Do", label: "To Do" },
  { value: "In Progress", label: "In Progress" },
  { value: "Review", label: "Review" },
  { value: "Done", label: "Done" },
];

export default function TaskStatusDropdown({ task }) {
  const [status, setStatus] = useState(task.status);

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    await updateTaskStatus(task.id, newStatus);
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      className="bg-gray-800 text-sm rounded px-2 py-1 border border-gray-700"
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
