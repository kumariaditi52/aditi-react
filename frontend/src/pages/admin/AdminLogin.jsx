import { useState } from "react";
import "../../css/adminlogin.css";
import { Admin_loader } from "../../components/admin_loader";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

    const [usernameid, setUsernameId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(true); // Toggle between login and signup
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            if (isSignup) {
                // Signup request
                const response = await axios.post("/api/adminsignup", { usernameid, password });
                if (response.data.message === "admin created successfully") {
                    toast.success("Admin signup successful");
                } else if (response.data.message === "admin already exist") {
                    toast.error("Admin already exists");
                }
            } else {
                // Login request
                const response = await axios.post("/api/adminlogin", { usernameid, password });
                if (response.data.message === "login success") {
                    toast.success("Login successful");

                    // Store the access token in localStorage
                    localStorage.setItem('adminToken', response.data.adminToken);
                    setTimeout(() => {
                        navigate("/adminDashboard"); // Navigate to dashboard after successful login
                    }, 1000);
                } else {
                    toast.error("Invalid username or password");
                }
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message); // Show backend error message
            } else {
                toast.error("An error occurred, please try again."); // Generic error
            }

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-body-container">
            <div className="admin-nav-container">
                <h1>Admin Panel</h1>
            </div>

            {loading ? (
                <Admin_loader />
            ) : (
                <div className="admin-login-container">
                    <h1>{isSignup ? "Sign Up" : "Log In"}</h1>
                    <form className="admin-login-form" onSubmit={handleSubmit}>
                        <ToastContainer />
                        <input
                            className="admin-input"
                            type="text"
                            name="usernameid"
                            autoComplete="off"
                            placeholder={isSignup ? "Enter New Username" : "Enter Username"}
                            onChange={(e) => setUsernameId(e.target.value)}
                            required
                        />
                        <input
                            className="admin-input"
                            type="password"
                            name="password"
                            autoComplete="off"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="admin-submit-btn">
                            {isSignup ? "Sign Up" : "Log In"}
                        </button>
                        <p>
                            {isSignup
                                ? "Already have an account?"
                                : "Don't have an account?"}{" "}
                            <a
                                className="admin-signup-link"
                                href="#"
                                onClick={() => setIsSignup(!isSignup)}
                            >
                                {isSignup ? "Log In" : "Sign Up"}
                            </a>
                        </p>
                    </form>
                </div>
            )}
        </div>
    );
};


export default AdminLogin;