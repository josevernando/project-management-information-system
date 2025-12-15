import React from "react";
import ProjectStatusDropdown from "../projects/ProjectStatusDropdown";

export default function ProjectTable({ projects }) {
  return (
    <div className="card">
      <table className="w-full text-left text-sm">
        <thead className="text-muted text-xs">
          <tr>
            <th className="py-2">Name</th>
            <th>Client</th>
            <th>Status</th>
            <th>Rate</th>
	    <th>Id</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className="border-t border-gray-800">
              <td className="py-3">{p.name}</td>
              <td>{p.client || "-"}</td>
              <td><ProjectStatusDropdown project={p} /></td>
              <td>{p.base_rate ? p.base_rate : "-"}</td>
	      <td>{p.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
