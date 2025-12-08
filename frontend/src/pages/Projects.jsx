import React, { useEffect, useState } from "react";
import api from "../services/api";
import ProjectForm from "../components/projects/ProjectForm";
import ProjectTable from "../components/projects/ProjectTable";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Projects</h2>
        <div className="text-sm text-muted">Create and manage projects</div>
      </div>

      <ProjectForm onCreated={(p) => setProjects((prev) => [p, ...prev])} />

      {loading ? (
        <div className="text-muted">Loading projects…</div>
      ) : (
        <ProjectTable projects={projects} />
      )}
    </div>
  );
}
