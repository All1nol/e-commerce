import api from './api';

// Get user profile
const getUserProfile = async () => {
    try{
        console.log('Fetching user profile...');
        const token = localStorage.getItem('token');
        console.log('Token exists:', !!token);
        
        const response = await api.get('/users/profile');
        console.log('Fetched user profile:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in getUserProfile:', error.response?.data || error.message);
        throw error;
    }
}

// Get products by user ID
const getUserProducts = async (userId) => {
    try {
        console.log('Fetching products for user ID:', userId);
        const response = await api.get(`/users/products`);
        console.log('Fetched user products:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in getUserProducts:', error.response?.data || error.message);
        throw error;
    }
}

export { getUserProfile, getUserProducts };

