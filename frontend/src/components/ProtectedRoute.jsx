import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap any page that requires login.
// Pass allowedRoles={["ADMIN"]} (etc.) to also restrict by role.
function ProtectedRoute({ children, allowedRoles }) {

    const { auth } = useAuth();

    if (!auth) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(auth.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;

}

export default ProtectedRoute;
