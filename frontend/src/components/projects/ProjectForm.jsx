import React, { useState } from "react";
import api from "../../services/api";

export default function ProjectForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    client: "",
    base_rate: "",
    status: "active",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        client: form.client,
        base_rate: form.base_rate ? parseFloat(form.base_rate) : 0,
        status: form.status,
      };
      const res = await api.post("/projects", payload);
      setForm({ name: "", client: "", base_rate: "", status: "active" });
      if (onCreated) onCreated(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          className="bg-[#071017] border border-gray-800 rounded p-2"
          placeholder="Project name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="bg-[#071017] border border-gray-800 rounded p-2"
          placeholder="Client"
          value={form.client}
          onChange={(e) => setForm({ ...form, client: e.target.value })}
        />
        <input
          className="bg-[#071017] border border-gray-800 rounded p-2"
          placeholder="Base rate (e.g. 30)"
          value={form.base_rate}
          onChange={(e) => setForm({ ...form, base_rate: e.target.value })}
        />
        <select
          className="bg-[#071017] border border-gray-800 rounded p-2"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 rounded bg-accent text-white disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Saving…" : "Create Project"}
        </button>
      </div>
    </form>
  );
}
