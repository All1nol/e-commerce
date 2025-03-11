import api from './api';

// Get user profile
const getUserProfile = async () => {
    try{
        const response = await api.get('/users/profile');
        return response.data;
    } catch (error) {
        console.error('Error in getUserProfile:', error.response?.data || error.message);
        throw error;
    }
}

// Get products for the authenticated user
const getUserProducts = async () => {
    try {
        const response = await api.get('/users/products');
        return response.data;
    } catch (error) {
        console.error('Error in getUserProducts:', error.response?.data || error.message);
        throw error;
    }
}

export { getUserProfile, getUserProducts };

