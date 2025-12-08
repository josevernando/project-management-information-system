import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!data) {
    return <div className="text-center p-10">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 space-y-6">

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 bg-[#0f172a] shadow rounded-xl border border-gray-700">
          <h3 className="text-sm text-gray-300">Total Projects</h3>
          <p className="text-3xl font-bold mt-2">{data.totalProjects}</p>
        </div>

        <div className="p-4 bg-[#0f172a] shadow rounded-xl border border-gray-700">
          <h3 className="text-sm text-gray-300">Total Employees</h3>
          <p className="text-3xl font-bold mt-2">{data.totalEmployees}</p>
        </div>

        <div className="p-4 bg-[#0f172a] shadow rounded-xl border border-gray-700">
          <h3 className="text-sm text-gray-300">Tasks In Progress</h3>
          <p className="text-3xl font-bold mt-2">{data.tasks.in_progress}</p>
        </div>

        <div className="p-4 bg-[#0f172a] shadow rounded-xl border border-gray-700">
          <h3 className="text-sm text-gray-300">Completed Tasks</h3>
          <p className="text-3xl font-bold mt-2">{data.tasks.done}</p>
        </div>
      </div>

      {/* Recent activities */}
      <div className="p-4 bg-[#0f172a] shadow rounded-xl border border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <div className="space-y-3">
          {data.recentActivities.length === 0 && (
            <p className="text-gray-400">No activities yet.</p>
          )}

          {data.recentActivities.map((a) => (
            <div key={a.ID} className="p-3 border rounded-lg">
              <p className="text-gray-300 font-medium">{a.description}</p>
              <p className="text-xs text-gray-500">{a.created_at}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
