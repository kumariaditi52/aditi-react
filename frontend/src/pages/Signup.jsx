/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/signup.css";
import Loader from "../components/loader.jsx";
import { handleSubmit, handleOtpSubmit, handleSignIn } from "../handlers/handlers.js"; // Assuming you have a handleSignIn function

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // For Sign-In form

    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true); // State to toggle between Sign-Up and Sign-In forms

    const navigate = useNavigate();

    const redirectToHomePage = async (e) => {
        e.preventDefault();
        console.log("Submitting OTP with:", { email, otp });
        setLoading(true);
        try {
            await handleOtpSubmit(e, email, otp, setOtpSent, setLoading, navigate);
        } catch (error) {
            console.error("Error during OTP submission:", error);
            toast.error("Error during OTP submission");
        } finally {
            setLoading(false);
        }
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await handleSignIn(e, email, password, setLoading, navigate);
        } catch (error) {
            console.error("Error during Sign-In:", error);
            toast.error("Error during Sign-In");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="Bar">{isSignUp ? 'Sign Up' : 'Sign In'}</div>
            <div className="form-container">

                <ToastContainer />
                {loading ? (
                    <Loader />
                ) : (
                    isSignUp ? (
                        !otpSent ? (
                            <form onSubmit={(e) => handleSubmit(e, email, username, setLoading, setOtpSent)}>
                                <input className="input text" type="text" name="UserName" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Your Name" required />
                                <input className="input email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                                <button className='signup-submit' type="submit">Sign Up</button>
                                <p>Already have an account? <span onClick={() => setIsSignUp(false)} style={{ color: 'blue', cursor: 'pointer' }}>Sign In</span></p>
                            </form>
                        ) : (
                            <form onSubmit={redirectToHomePage}>
                                <input className="input text" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP from email" maxLength={4} required />
                                <button className='signup-submit' type="submit">Submit OTP</button>
                            </form>
                        )
                    ) : (
                        <form onSubmit={handleSignInSubmit}>
                            <input className="input email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                            <input className="input pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                            <button className='signup-submit' type="submit">Sign In</button>
                            <p>Don't have an account? <span onClick={() => setIsSignUp(true)} style={{ color: 'blue', cursor: 'pointer' }}>Sign Up</span></p>
                        </form>
                    )
                )}
            </div>
        </>
    );
}

export default SignupForm;
