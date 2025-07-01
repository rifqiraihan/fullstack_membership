import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface IVideo {
  id: number;
  title: string;
  url: string;
  created_at: string;
}

const VideosPage = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { token } = useAuth();
  const navigate = useNavigate();

  const getEmbedUrl = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/videos`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVideos(res.data);
      } catch (err: any) {
        setError("Failed to fetch videos. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [token]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleVideos = videos.slice(0, visibleCount);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center text-blue-600 hover:underline"
        >
          ← Back to Home
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center text-white">Videos</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded text-center">
            {error}
          </div>
        ) : videos.length === 0 ? (
          <p className="text-center text-gray-500">No videos available.</p>
        ) : (
          <>
            <div className="grid gap-6">
              {visibleVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {new Date(video.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={getEmbedUrl(video.url)}
                      title={video.title}
                      className="w-full h-96 rounded"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < videos.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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

export default VideosPage;
