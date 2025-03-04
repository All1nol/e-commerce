import api from './api';

//Create new product
const createProduct = async (productData) => {
    try {
        console.log('Sending product data:', productData);
        const response = await api.post('/products/createProduct', productData);
        console.log('Product creation response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in createProduct:', error.response?.data || error.message);
        throw error;
    }
}

// Get all products
const getProducts = async () => {
    try {
        const response = await api.get('/products');
        console.log('Fetched products:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in getProducts:', error.response?.data || error.message);
        throw error;
    }
}

// Get product by ID
const getProductById = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error in getProductById:', error.response?.data || error.message);
        throw error;
    }
}

// Update product
const updateProduct = async (id, productData) => {
    try {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error('Error in updateProduct:', error.response?.data || error.message);
        throw error;
    }
}

// Delete product
const deleteProduct = async (id) => {
    try {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error in deleteProduct:', error.response?.data || error.message);
        throw error;
    }
}

export { createProduct, getProducts, getProductById, updateProduct, deleteProduct };