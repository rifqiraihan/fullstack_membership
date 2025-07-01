import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [membershipType, setMembershipType] = useState<"A" | "B" | "C">("A");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    console.log(membershipType)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        name,
        email,
        password,
        membership_type: membershipType,
      });
      alert("Registrasi berhasil, silakan login.");
      navigate("/login");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Terjadi kesalahan. Coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <input
          className="w-full border p-2 mb-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Lengkap"
          disabled={loading}
        />
        <input
          className="w-full border p-2 mb-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          disabled={loading}
        />
        <input
          className="w-full border p-2 mb-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          disabled={loading}
        />
        <select
          className="w-full border p-2 mb-4 rounded"
          value={membershipType}
          onChange={(e) => setMembershipType(e.target.value as "A" | "B" | "C")}
          disabled={loading}
        >
          <option value="A">Tipe A (3 Artikel + 3 Video)</option>
          <option value="B">Tipe B (10 Artikel + 10 Video)</option>
          <option value="C">Tipe C (Semua Konten)</option>
        </select>
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          {loading ? "Loading..." : "Register"}
        </button>

        <p className="mt-6 text-center text-sm">
          Sudah punya akun?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
