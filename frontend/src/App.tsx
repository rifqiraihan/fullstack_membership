import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import { JSX } from "react";
import ArticlesPage from "./pages/ArticlesPage";
import VideosPage from "./pages/VideosPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/articles" element={<PrivateRoute><ArticlesPage /></PrivateRoute>} />
        <Route path="/videos" element={<PrivateRoute><VideosPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
