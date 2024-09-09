// import React from 'react'
import "../../css/admin.css";

export const AdminLogin = () => {
    return (
        <>
            <div className="body-conatiner">
                <div className="nav-container">
                    <h1>Welcome to Admin Panel</h1>
                </div>
                <div className="login-container">
                    <h1>Admin Login</h1>
                    <form className="login-form">
                        <input className="admin-username" type="text" placeholder="Enter Username" /><br /><br />
                        <input className="admin-password"  type="password" placeholder="Enter Password" /><br /><br />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
