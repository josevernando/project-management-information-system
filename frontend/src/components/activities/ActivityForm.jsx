import { useState } from "react";
import api from "../../services/api";

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

    try {
      // Use axios API client with JWT automatically included
      const res = await api.post("/activities", payload);
      alert("Activity saved!");

      // reset form
      setFormData({
        description: "",
        hours_spent: "",
        billable: false,
        project_id: "",
        task_id: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save activity");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <textarea
        name="description"
        placeholder="What did you do?"
        className="border p-2 rounded bg-white dark:bg-neutral-900 dark:border-neutral-700 text-gray-900 dark:text-gray-100"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <input
        name="hours_spent"
        type="number"
        step="0.1"
        placeholder="Hours spent"
        className="border p-2 rounded bg-white dark:bg-neutral-900 dark:border-neutral-700 text-gray-900 dark:text-gray-100"
        value={formData.hours_spent}
        onChange={handleChange}
        required
      />

      <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <input
          type="checkbox"
          name="billable"
          checked={formData.billable}
          onChange={handleChange}
          className="w-4 h-4"
        />
        Billable?
      </label>

      <input
        name="project_id"
        type="number"
        placeholder="Project ID (optional)"
        className="border p-2 rounded bg-white dark:bg-neutral-900 dark:border-neutral-700 text-gray-900 dark:text-gray-100"
        value={formData.project_id}
        onChange={handleChange}
      />

      <input
        name="task_id"
        type="number"
        placeholder="Task ID (optional)"
        className="border p-2 rounded bg-white dark:bg-neutral-900 dark:border-neutral-700 text-gray-900 dark:text-gray-100"
        value={formData.task_id}
        onChange={handleChange}
      />

      <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
        Save Activity
      </button>
    </form>
  );
};

export default ActivityForm;

