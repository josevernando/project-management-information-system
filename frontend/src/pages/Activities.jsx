import ActivityForm from "../components/activities/ActivityForm";
import ActivityTimeline from "../components/activities/ActivityTimeline";

export default function ActivityPage() {
  return (
    <div className="p-6 space-y-6">

      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Activity Log
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Timeline */}
        <div className="lg:col-span-2">
          <ActivityTimeline />
        </div>

        {/* Activity Form */}
        <div className="border rounded-lg p-4 bg-white dark:bg-neutral-900 dark:border-neutral-700">
          <h2 className="text-md font-semibold mb-3 text-gray-900 dark:text-gray-200">
            Add Activity
          </h2>

          <ActivityForm />
        </div>

      </div>
    </div>
  );
}
