import { useState } from 'react';
import { verifyOTP } from '../api/auth';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await verifyOTP({ email, otp });
            toast.success("Email verified successfully!");
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid OTP");
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
            }}>Verify OTP</h2>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
            }}>
                <input 
                    type="text" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    maxLength="6"
                    required
                    style={{
                        padding: '12px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        fontSize: '16px'
                    }}
                />
                <button type="submit" style={{
                    padding: '12px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}>Verify OTP</button>
            </form>
        </div>
    );
};

export default VerifyOTP;