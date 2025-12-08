import { useState } from "react";

const ActivityForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    hours_spent: "",
    billable: false,
    project_id: "",
    task_id: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      description: formData.description,
      hours_spent: parseFloat(formData.hours_spent),
      billable: formData.billable,
      project_id: formData.project_id ? parseInt(formData.project_id) : null,
      task_id: formData.task_id ? parseInt(formData.task_id) : null,
    };

    const res = await fetch("http://localhost:8080/api/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Activity saved!");
    } else {
      alert("Failed: " + JSON.stringify(data));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Description */}
      <textarea
        name="description"
        placeholder="What did you do?"
        className="border p-2 rounded bg-white dark:bg-neutral-900 dark:border-neutral-700 text-gray-900 dark:text-gray-100"
        onChange={handleChange}
        required
      />

      {/* Hours Spent */}
      <input
        name="hours_spent"
        type="number"
        step="0.1"
        placeholder="Hours spent"
        className="border p-2 rounded bg-white dark:bg-neutral-900 dark:border-neutral-700 text-gray-900 dark:text-gray-100"
        onChange={handleChange}
        required
      />

      {/* Billable */}
      <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <input
          type="checkbox"
          name="billable"
          onChange={handleChange}
          className="w-4 h-4"
        />
        Billable?
      </label>

      {/* Project ID */}
      <input
        name="project_id"
        type="number"
        placeholder="Project ID (optional)"
        className="border p-2 rounded bg-white dark:bg-neutral-900 dark:border-neutral-700 text-gray-900 dark:text-gray-100"
        onChange={handleChange}
      />

      {/* Task ID */}
      <input
        name="task_id"
        type="number"
        placeholder="Task ID (optional)"
        className="border p-2 rounded bg-white dark:bg-neutral-900 dark:border-neutral-700 text-gray-900 dark:text-gray-100"
        onChange={handleChange}
      />

      <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
        Save Activity
      </button>
    </form>
  );
};

export default ActivityForm;
