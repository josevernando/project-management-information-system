import api from "./api"

export async function updateProjectStatus(id, status) {
  return api.put(`/projects/${id}/status`, { status });
}
