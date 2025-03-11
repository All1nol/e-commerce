import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserProfile } from '../services/userService';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated, isLoading: authLoading } = useAuth();

    const fetchUser = async () => {
        try{
            const userProfile = await getUserProfile();
            setUser(userProfile);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        // Only fetch user data when auth is ready and user is authenticated
        if (!authLoading && isAuthenticated) {
            fetchUser();
        } else if (!authLoading && !isAuthenticated) {
            // If auth is ready but user is not authenticated, set loading to false
            setLoading(false);
        }
    }, [authLoading, isAuthenticated]);

    return(
        <UserContext.Provider
            value={{
                user,
                loading,
                error,
                fetchUser,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if(context === undefined) {
        throw new Error('useUser must be used withing a UserProvider');
    }
    return context; 
}
        
    
