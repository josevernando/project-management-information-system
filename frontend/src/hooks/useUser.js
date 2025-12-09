import { useEffect, useState } from "react";
import api from "../services/api";

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/profile")
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return user;
}

