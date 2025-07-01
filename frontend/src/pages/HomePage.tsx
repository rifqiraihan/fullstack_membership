import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const HomePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl text-black font-bold mb-4">Welcome{user?.name ? `, ${user.name}` : ""}!</h1>
        <p className="text-gray-700 mb-6">
          Membership Type:{" "}
          <span className="font-semibold text-blue-600">{user?.membership_type}</span>
        </p>

        <div className="flex flex-col gap-4 mb-6">
          <Link
            to="/articles"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            📄 View Articles
          </Link>
          <Link
            to="/videos"
            className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
          >
            🎬 View Videos
          </Link>
        </div>

        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
