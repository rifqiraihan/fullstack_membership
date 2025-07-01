import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const HomePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>
      <p className="mb-2">Membership Type: <strong>{user?.membership_type}</strong></p>

      <div className="flex flex-col gap-2 mt-4">
        <Link to="/articles" className="text-blue-500 underline">📄 View Articles</Link>
        <Link to="/videos" className="text-blue-500 underline">🎬 View Videos</Link>
      </div>

      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
