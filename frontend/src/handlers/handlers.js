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
                navigate("/");
            }, 1000); 
        }
        

        toast.success(response.data.message || "User Verified Successfully");
    } catch (error) {
        console.error("OTP verification error:", error.response?.data); // Log the error details
        toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
        setLoading(false);
    }
};


export const handleSignIn = async (e, email, password, setLoading , navigate) => {

    // export const handleSignIn = async (e, email, password, setLoading) => {
    e.preventDefault();
    // try {
    //     const res = await axios.post('/api/auth/login', { email, password });
    //     const token = res.data.token;

    //     // Store token in localStorage or cookies
    //     localStorage.setItem('token', token);

    //     // Navigate to the home page after login
    //     navigate('/home');
    // } catch (error) {
    //     console.error("Error during sign-in:", error);
    //     // Handle error (e.g., display an error message)
    // } finally {
    //     setLoading(false);
    // }


    // console.log("Sign-In submitted:", { email, password });
    // setLoading(false);



    //  navigate("/home");
    navigate("/");


};
