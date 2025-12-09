import api from "./api";

export const generateDocx = () =>
  fetch("/api/ai/summary-docx", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
