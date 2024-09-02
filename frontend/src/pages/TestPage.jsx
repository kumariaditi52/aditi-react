import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/signup.css";
import Loader from "../components/loader.jsx";
import { handleSubmit, handleOtpSubmit } from "../handlers/handlers.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (otpSent) {
                await handleOtpSubmit(e, email, otp, setOtpSent, setLoading, navigate);
                toast.success("User Registered Successfully");
            } else {
                await handleSubmit(e, email, setLoading, setOtpSent);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred");
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
                ) : (
                    <form onSubmit={handleFormSubmit}>
                        {!otpSent ? (
                            <>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />
                                <button type="submit">Sign Up</button>
                            </>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP from email"
                                    maxLength={4}
                                    required
                                />
                                <button type="submit">Submit OTP</button>
                            </>
                        )}
                    </form>
                )}
            </div>
        </>
    );
};

export default SignupForm;
