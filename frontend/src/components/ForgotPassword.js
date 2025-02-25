import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
    //         toast.success("Password reset link sent to email!");
    //         navigate('/login');
    //     } catch (err) {
    //         toast.error(err.response?.data?.message || "Failed to send reset link");
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            console.log('Server response:', response.data);
            toast.success("Password reset link sent to email!");
            navigate('/login');
        } catch (err) {
            // Detailed error logging
            console.log('Full error:', err);
            console.log('Error response:', err.response);
            console.log('Error data:', err.response?.data);
            
            // More informative error message
            const errorMessage = err.response?.data?.message || 
                               err.message || 
                               "Failed to send reset link";
            toast.error(errorMessage);
        }
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
            <h2 style={{
                textAlign: 'center',
                color: '#333',
                marginBottom: '20px'
            }}>Forgot Password</h2>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
            }}>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    style={{
                        padding: '12px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        fontSize: '16px'
                    }}
                />
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
                >Send Reset Link</button>
                
                <button 
                    onClick={() => navigate('/login')}
                    style={{
                        padding: '12px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}
                >Back to Login</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
