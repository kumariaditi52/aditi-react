import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/HomePage.jsx";
import SignupForm from "./pages/Signup.jsx";
import ShowCart from "./pages/ShowCart.jsx";
import BuyPage from "./pages/BuyPage.jsx";
import Profile from "./pages/Profile.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashBoard from "./pages/admin/AdminDashboard.jsx";
// import { Product_avail } from "./components/admin-components/Product_avail.jsx";
// import AdminRoutes from "./AdminRoutes.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/cart" element={<ShowCart />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/userprofile" element={<Profile />} />


        {/* admin routes starts here */}
        {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
        <Route path="/*admin" element={<AdminLogin />} />
        <Route path="/adminDashboard" element={<AdminDashBoard />} />
      </Routes >
    </Router >

  )
}

export default App