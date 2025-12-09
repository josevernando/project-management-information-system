import React, { useState } from "react";
import useUser from "../hooks/useUser";

export default function ProfilePage() {
  const user = useUser();
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/api/ai/summary-docx", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("Failed to generate summary");
      }

      // Receive file blob
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // Auto-trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = "ai-summary.docx";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold text-gray-200">My Profile</h1>

      <div className="card p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded bg-gray-800 flex items-center justify-center text-2xl">
            {user.name.substring(0, 2).toUpperCase()}
          </div>

          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted">{user.email}</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4 space-y-2">
          <p><b>Position:</b> {user.position || "-"}</p>
          <p><b>Department:</b> {user.department || "-"}</p>
          <p><b>Joined:</b> {new Date(user.created_at).toLocaleDateString()}</p>
        </div>

        {/* ---- AI Summary Button ---- */}
        <div className="pt-4">
          <button
            onClick={generateSummary}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate AI Summary (DOCX)"}
          </button>
        </div>
      </div>
    </div>
  );
}
