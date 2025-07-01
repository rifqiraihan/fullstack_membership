import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const ArticlesPage = () => {
  const [videos, setVideos] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/videos`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setVideos(res.data));
  }, [token]);

  return (
    <div>
      <h2>Articles</h2>
      <ul>{videos.map((a: any) => <li key={a.id}>{a.title}</li>)}</ul>
    </div>
  );
};

export default ArticlesPage;
