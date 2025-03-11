import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserProfile } from '../services/userService';


const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        // Check if token exists
        const token = localStorage.getItem('token');
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

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
        
    
