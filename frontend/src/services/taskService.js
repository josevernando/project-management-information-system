import api from "./api";

export async function updateTaskStatus(id, status) {
  return api.put(`/tasks/${id}/status`, { status });
}

