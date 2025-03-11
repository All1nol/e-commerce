import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const navigate = useNavigate();
    const { register, isLoading, error, isAuthenticated, clearError } = useAuth();
    
    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
        
        // Clear errors when component unmounts
        return () => {
            clearError();
        };
    }, [isAuthenticated, navigate, clearError]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordError('');
        
        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        
        const success = await register(email, password);
        if (success) {
            navigate('/dashboard');
        }
    };
    
    // Display either the password error or the API error
    const displayError = passwordError || error;
    
    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Create an account</h2>
            <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
                Enter your details to create a new account
            </p>
            
            {displayError && (
                <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '10px', marginBottom: '20px', border: '1px solid #ef9a9a' }}>
                    {displayError}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={isLoading}
                    style={{ 
                        width: '100%', 
                        padding: '10px', 
                        backgroundColor: isLoading ? '#ccc' : '#333', 
                        color: 'white', 
                        border: 'none', 
                        cursor: isLoading ? 'not-allowed' : 'pointer' 
                    }}
                >
                    {isLoading ? 'Processing...' : 'Register'}
                </button>
            </form>
            
            <div style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#333', textDecoration: 'underline' }}>
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Register;    
