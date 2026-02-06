import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProtectedRoute({ children, allowedRoles }) {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("https://osback.onrender.com/api/auth/me", { withCredentials: true });
        const user = res.data;

        if (!allowedRoles || allowedRoles.includes(user.role)) {
          setIsAuthorized(true);
        }
      } catch (err) {
        setIsAuthorized(false);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [allowedRoles]);

  if (loading) return <div>Checking authentication...</div>;

  return isAuthorized ? children : <Navigate to="/" replace />;
}