import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface IArticle {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

const ArticlesPage = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/articles`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArticles(res.data);
      } catch (err: any) {
        setError("Failed to fetch articles. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [token]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center text-blue-600 hover:underline"
        >
          ← Back to Home
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center text-white">Articles</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded text-center">
            {error}
          </div>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-500">No articles available.</p>
        ) : (
          <>
            <div className="grid gap-6">
              {articles.slice(0, visibleCount).map((article) => (
                <div
                  key={article.id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {new Date(article.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-gray-700 line-clamp-4">{article.content}</p>
                </div>
              ))}
            </div>

            {visibleCount < articles.length && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
