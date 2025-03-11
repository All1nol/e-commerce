import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const result = await login(email, password);
            if (result.success) {
                // Navigate after successful login
                navigate('/dashboard', { replace: true });
            }
        } catch (err) {
            console.error('Login error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign in to your account</h2>
            <p style={{ textAlign: 'center', marginBottom: '20px' }}>
                Or{' '}
                <Link to="/register" style={{ color: '#333', textDecoration: 'underline' }}>
                    create a new account
                </Link>
            </p>
            
            <form onSubmit={handleSubmit}>
                {error && (
                    <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '10px', marginBottom: '20px', border: '1px solid #ef9a9a' }}>
                        {error}
                    </div>
                )}
                
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email-address" style={{ display: 'block', marginBottom: '5px' }}>
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            backgroundColor: isSubmitting ? '#ccc' : '#333', 
                            color: 'white', 
                            border: 'none', 
                            cursor: isSubmitting ? 'not-allowed' : 'pointer' 
                        }}
                    >
                        {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;