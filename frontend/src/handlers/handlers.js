import axios from "axios";
import { toast } from "react-toastify";



//       ***************** signup handler ****************

export const handleSubmit = async (e, email, username, setLoading, setOtpSent) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await axios.post("/api/signup", { email, username });
        console.log(response.data);
        toast.success(response.data.message || "Successfully Registered");
        setOtpSent(true);
    } catch (error) {
        console.error("Signup error:", error.response?.data);
        toast.error(error.response?.data?.message || "User Already Exists");
    } finally {
        setLoading(false);
    }
};


export const handleOtpSubmit = async (e, email, otp, setOtpSent, setLoading, navigate) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await axios.post("/api/verify", { email, otp });
        const token = response.data.token;

        if (token) {
            localStorage.setItem('authToken', token);
            setOtpSent(false);
            setTimeout(() => {
                navigate("/"); // Ensure this route is correct
            }, 1000); // Adjust timeout if necessary
        }

        toast.success(response.data.message || "User Verified Successfully");
    } catch (error) {
        console.error("OTP verification error:", error.response?.data); // Log the error details
        toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
        setLoading(false);
    }
};


export const handleSignIn=async()=>{
    console.log("sign in")
}