// TaskStatusDropdown.jsx
import { useState } from "react";

export default function TaskStatusDropdown({ task, onChange }) {
  const [status, setStatus] = useState(task.status);

  const statuses = [
    "TO_DO",
    "IN_PROGRESS",
    "BLOCKED",
    "IN_REVIEW",
    "DONE"
  ];

  const handleChange = (e) => {
    setStatus(e.target.value);
    onChange(e.target.value);
  };

  return (
    <select value={status} onChange={handleChange} className="border rounded p-1">
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s.replace("_", " ")}
        </option>
      ))}
    </select>
  );
}

