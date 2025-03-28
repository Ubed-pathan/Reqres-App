import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SignIn from "./pages/SignIn";
import UsersList from "./pages/UsersList";

const AppRoutes = () => {
  return (
    <Router>
      <AuthHandler />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </Router>
  );
};

const AuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/users");
    } else {
      navigate("/");
    }
  }, []);

  return null;
};

export default AppRoutes;
