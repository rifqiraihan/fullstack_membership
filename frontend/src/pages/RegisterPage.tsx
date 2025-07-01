import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [membershipType, setMembershipType] = useState<"A" | "B" | "C">("A");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFormValid = name && email && password && membershipType;

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        name,
        email,
        password,
        membership_type: membershipType,
      });

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-black text-center">Register</h2>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm rounded p-3 mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            className="w-full border bg-white text-black border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            disabled={loading}
          />
          <input
            className="w-full border bg-white text-black border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={loading}
          />
          <div className="relative">
            <input
              className="w-full border bg-white text-black border-gray-300 rounded px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              disabled={loading}
            />
            <button
              type="button"
              className="absolute bg-gray-300 inset-y-0 right-0 flex items-center px-3 text-sm text-blue-600 hover:underline"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <select
            className="w-full border bg-white text-black border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={membershipType}
            onChange={(e) => setMembershipType(e.target.value as "A" | "B" | "C")}
            disabled={loading}
          >
            <option value="A">Type A (3 Articles + 3 Videos)</option>
            <option value="B">Type B (10 Articles + 10 Videos)</option>
            <option value="C">Type C (All Content)</option>
          </select>

          <button
            onClick={handleRegister}
            disabled={loading || !isFormValid}
            className={`w-full py-2 rounded font-medium transition-colors ${
              loading || !isFormValid
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
