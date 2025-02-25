import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = ({ onNext }) => {
    const [user, setUser] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (user.password !== user.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name: user.name,
                email: user.email,
                password: user.password
            });
    
            if (response.data) {
                toast.success("Registration successful! Please verify your email.");
                navigate('/verify-otp', { state: { email: user.email } });
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Registration failed";
            toast.error(errorMessage);
        }
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
            }}>Register</h2>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
            }}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    onChange={handleChange} 
                    required 
                    style={{
                        padding: '12px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        fontSize: '16px'
                    }}
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange} 
                    required 
                    style={{
                        padding: '12px',
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
                            padding: '12px',
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
                            padding: '12px',
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
                <button 
                    type="submit"
                    style={{
                        padding: '12px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}
                >Register</button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <a 
                    onClick={() => navigate('/login')}
                    style={{ 
                        display: 'inline-block',
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        marginRight: '10px',
                        cursor: 'pointer'
                    }}
                >Login</a>
            </div>
        </div>
    );
};
export default Register;