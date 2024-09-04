import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/signup.css";
import Loader from "../components/loader.jsx";
import { handleSubmit, handleOtpSubmit } from "../handlers/handlers.js";


import { ToastContainer, toast } from 'react-toastify'; /* importing the react toastify */
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
    const [username, setUsername] = useState(''); // Added username state
    const [email, setEmail] = useState('');

    // setting up the states of otp
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    //setting Loader between otp verfication
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const redirectToHomePage = async (e) => {
        e.preventDefault();
        console.log("Submitting OTP with:", { email, otp }); // Log values
        setLoading(true);
        try {
            await handleOtpSubmit(e, email, otp, setOtpSent, setLoading, navigate);
        } catch (error) {
            console.error("Error during OTP submission:", error);
            toast.error("Error during OTP submission")
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
                        <form onSubmit={(e) => handleSubmit(e, email, username, setLoading, setOtpSent)}>
                            <input type="text" name="UserName" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Your Name" required /> {/* Added value and onChange */}
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                            <button type="submit">Sign Up</button>
                        </form>
                    ) : (
                        <form onSubmit={redirectToHomePage}>
                            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP from email" maxLength={4} required />
                            <button type="submit">Submit OTP</button>
                        </form>
                    )
                    )}
            </div>
        </>
    )
}
export default SignupForm;
