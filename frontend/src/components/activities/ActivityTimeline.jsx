import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function ActivityTimeline() {
  const [acts, setActs] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  async function fetchActivities() {
    try {
      const res = await api.get("/activities");
      setActs(res.data);
    } catch (err) {
      console.error("Failed to load activities:", err);
    }
  }

  return (
    <div className="border rounded-xl p-6 bg-white dark:bg-neutral-900 dark:border-neutral-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Recent Activities
      </h2>

      <ul className="space-y-5">
        {acts.length === 0 && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            No activity recorded yet.
          </div>
        )}

        {acts.map((a) => (
          <li
            key={a.id}
            className="flex gap-3 pb-4 border-b dark:border-neutral-700 last:border-none"
          >
            {/* Dot */}
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>

            {/* Activity Info */}
            <div className="flex flex-col">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {a.description}
              </div>

              <div className="text-xs text-gray-600 dark:text-gray-400">
                {a.hours_spent}h •{" "}
                {a.billable ? (
                  <span className="text-green-600 dark:text-green-400">Billable</span>
                ) : (
                  <span className="text-red-500 dark:text-red-400">Non-billable</span>
                )}
              </div>

              {/* Project / Task info */}
              <div className="text-[11px] text-gray-500 dark:text-gray-400">
                Project: {a.project_id || "-"} • Task: {a.task_id || "-"}
              </div>

              {/* Date */}
              <div className="text-[10px] text-gray-400 dark:text-gray-500">
                {new Date(a.created_at).toLocaleString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
