// src/pages/ArticlesPage.tsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/articles`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setArticles(res.data));
  }, [token]);

  return (
    <div>
      <h2>Articles</h2>
      <ul>{articles.map((a: any) => <li key={a.id}>{a.title}</li>)}</ul>
    </div>
  );
};

export default ArticlesPage;
