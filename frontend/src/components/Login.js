import { useState } from 'react';
import { loginUser } from '../api/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };


    const handleResendVerification = async () => {
    try {
        await axios.post('http://localhost:5000/api/auth/resend-verification', {
            email: user.email
        });
        toast.success("Verification email sent! Please check your inbox.");
    } catch (error) {
        toast.error("Failed to send verification email. Please try again.");
    }
};


      const handleSubmit = async (e) => {
          e.preventDefault();
          try {
              const response = await loginUser(user);
              if (response.success) {
                  toast.success("Login successful!");
                  navigate('/dashboard');
              }
          } catch (error) {
              if (error.response?.data?.message === "Verify your email first") {
                  toast.info("Please verify your email first");
                  navigate('/', { 
                      state: { 
                          email: user.email,
                          fromLogin: true 
                      } 
                  });
              } else {
                  toast.error(error.response?.data?.message || "Login failed");
              }
          }
      };
    // Add a resend verification function
    // const handleResendVerification = async () => {
    //     try {
    //         await axios.post('http://localhost:5000/api/auth/generate-otp', {
    //             email: user.email
    //         });
    //         toast.success("New verification OTP sent to your email!");
    //     } catch (error) {
    //         toast.error("Failed to send verification email. Please try again.");
    //     }
    // };

    const handleGoogleLogin = () => {
        window.open("http://localhost:5000/api/auth/google", "_self");
        // After successful authentication, the backend should redirect to:
        // http://localhost:3000/dashboard
    };

   

    const handleGithubLogin = () => {
        window.open("http://localhost:5000/api/auth/github", "_self");
        // After successful authentication, the backend should redirect to:
        // http://localhost:3000/dashboard
    };

    const handleFacebookLogin = () => {
        window.open("http://localhost:5000/api/auth/facebook", "_self");
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success("Logged out successfully!");
        navigate('/login');
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '40px auto',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            backgroundColor: '#ffffff'
        }}>
            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <button 
                    onClick={handleLogout}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
            </div>

            <h2 style={{
                textAlign: 'center',
                color: '#333',
                marginBottom: '20px'
            }}>Login</h2>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
            }}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    style={{
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        fontSize: '16px'
                    }}
                />

                <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            fontSize: '16px'
                        }}
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer'
                        }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <div style={{ position: 'relative' }}>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            fontSize: '16px'
                        }}
                    />
                    <span
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer'
                        }}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>




                <button type="submit" style={{
                    padding: '12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}>Login</button>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault()
                        handleForgotPassword()
                    }}
                    style={{
                        padding: '12px',
                        color: 'red',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        width: '700',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                        textDecoration: 'none',
                        display: 'block',
                        textAlign: 'center'
                    }}
                >Forgot Password</a>
            </form>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault()
                        navigate('/')
                    }}


                    style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >Register</a>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '20px'
            }}>
                
                <div
                    onClick={handleGoogleLogin}
                    style={{
                        backgroundColor: '#DB4437',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '50%',
                        cursor: 'pointer'
                    }}
                >
                    <FaGoogle size={20} />
                </div>

                <div
                    onClick={handleFacebookLogin}
                    style={{
                        backgroundColor: '#4267B2',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '50%',
                        cursor: 'pointer'
                    }}
                >
                    <FaFacebook size={20} />
                </div>

                <div
                    onClick={handleGithubLogin}
                    style={{
                        backgroundColor: '#333',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '50%',
                        cursor: 'pointer'
                    }}
                >
                    <FaGithub size={20} />
                </div>
            </div>

        </div>
    );
};

export default Login;
