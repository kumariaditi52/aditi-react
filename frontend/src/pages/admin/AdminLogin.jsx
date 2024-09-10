/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import "../../css/adminlogin.css";
import axios from 'axios';

const AdminLogin = () => {

    const [usernameid, setUsernameId] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/api/adminlogin", { usernameid, password }).then((res) => {
            console.log(res.data);
            if (res.data.message === "success") {
                1
                window.location.href = "/admin";
            }
        }).catch(err =>
            console.log(err)
        )
    }

return (
    <div className="admin-body-container">
        <div className="admin-nav-container">
            <h1>Admin Panel</h1>
        </div>

        <div className="admin-login-container">
            <h1>sign up</h1>
            <form className="admin-login-form" onSubmit={handleSubmit}>
                <input className="admin-input" type="text" name="usernameid" autoComplete="off" placeholder={"Enter New Username"} onChange={(e) => setUsernameId(e.target.value)} />
                <input className="admin-input" type="password" name="password" autoComplete="off" placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="admin-submit-btn">
                    Sign Up
                </button>
                <>
                    <p><a className="admin-forgot-password" href="#">Forgot Password?</a></p>
                    <p>
                        Don't have an account?{" "}
                        <a className="admin-signup-link" href="#">
                            Sign Up
                        </a>
                    </p>
                </>


            </form>
        </div>
    </div>
);
};


export default AdminLogin;