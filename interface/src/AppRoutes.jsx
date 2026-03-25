import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from "./components/PrivateRoutes";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard-teste" element={<DashboardPage />} />
            <Route path="/dashboard" element={
                <PrivateRoute>
                    <DashboardPage />
                </PrivateRoute>
            } >
                <Route index element={<Navigate to="home" replace/>}/>
            </Route>
        </Routes>
    )
}

export default AppRoutes;