import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function PrivateRoute({ children }) {
    // Buscando token no localStorage
    const token = localStorage.setItem("token");

    if (!token) return <Navigate to="/" replace />

    try {
        const decoded = jwtDecode(token);
        const dateNow = Date.now() / 1000

        if (decoded.exp < dateNow) {
            localStorage.removeItem("token");
            return <Navigate to="/login" replace />
        }
    } catch (error) {
        localStorage.removeItem("token");
        return <Navigate to="/" replace />
    }

    return children;
}

export default PrivateRoute;