import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/signup.css";
import Loader from "../components/loader.jsx";
import { handleSubmit, handleOtpSubmit } from "../handlers/handlers.js";
// import { handleSuccess, handleError } from "../handlers/handlers.js";


import { ToastContainer, toast } from 'react-toastify'; /* importing the react toastify */
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    // const [error, setError] = useState('');
    // const [success, setSuccess] = useState('');

    // setting up the states of otp
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    //setting Loader between otp verfication
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const redirectToHomePage = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await handleOtpSubmit(e, email, otp, setOtpSent, setLoading, navigate);
            toast.success("User Registered Successfully");
            console.clear();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to verify OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="Bar">Sign Up</div>
            <div className="form-container">

                <ToastContainer />
                {loading ? (
                    <Loader />
                ) :
                    (!otpSent ? (
                        <form onSubmit={(e) => handleSubmit(e, email, setLoading, setOtpSent)}>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                            <button type="submit">Sign Up</button>
                        </form>
                    ) : (
                        // <form onSubmit={(e) => handleOtpSubmit(e, email, otp, setLoading, setOtpSent)}>
                        <form onSubmit={redirectToHomePage}>
                            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP from email" maxLength={4} required />
                            <button type="submit">Submit OTP</button>
                            {/* {error && <div className="error">{error}</div>}
                        {success && <div className="success">{success}</div>} */}
                        </form>
                    )
                    )}
            </div>
        </>
    )
}
export default SignupForm;
