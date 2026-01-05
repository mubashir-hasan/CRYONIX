import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowed }) {
    const { isAuthenticated, authType, loading } = useAuth();

    if (loading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/user/user_login" replace />;
    }

    if (allowed && authType !== allowed) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;