import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoutes";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/dashboard" element={
                <PrivateRoute>
                    
                </PrivateRoute>
            }/>
        </Routes>
    )
}

export default AppRoutes;