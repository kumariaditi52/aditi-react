import AdminDashBoard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

const AdminRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/*admin" element={<AdminLogin />} />
                <Route path="/admin/*adminDashboard" element={<AdminDashBoard />} />
            </Routes>
        </>
    )
}

export default AdminRoutes;