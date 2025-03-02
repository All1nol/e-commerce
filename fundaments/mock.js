const button = document.querySelector('#submitButton');
button.addEventListener('click', async () => {
    try {
        // Show loading state
        showLoadingState();

        // Wait for API response
        const response = await fetch('https://api.example.com/submit');
        const data = await response.json();

        // Check if request was successful
        if (!response.ok) {
            throw new Error('API call failed');
        }

        // Only show success after we know it worked
        showSuccessMessage();
        console.log('Success!');

    } catch (error) {
        // Show error if something went wrong
        showErrorMessage(error.message);
    } finally {
        // Hide loading state
        hideLoadingState();
    }
});

// Code A
Promise.all([
    fetch('api/data1'),
    fetch('api/data2')
]);

// Code B
const data1 = await fetch('api/data1');
const data2 = await fetch('api/data2');



// Fetch a user's profile
// Fetch their list of orders
// Show an error if either request fails
const profile = document.querySelector('#profile');
const profileSection = document.querySelector('#profileSection');
const ordersSection = document.querySelector('#ordersSection');

// Add loading flag and debounce timer
let isLoading = false;
let debounceTimer;

profile.addEventListener('click', async () => {
    // Prevent multiple clicks while loading
    if (isLoading) {
        console.log('Already loading data...');
        return;
    }

    // Debounce the clicks (wait 300ms between clicks)
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
        try {
            isLoading = true;
            profile.disabled = true; // Disable button while loading

            // Show loading states
            profileSection.innerHTML = 'Loading profile...';
            ordersSection.innerHTML = 'Loading orders...';

            // Handle profile and orders separately
            const profilePromise = fetch('/api/userProfile')
                .then(res => res.json())
                .then(profileData => {
                    profileSection.innerHTML = `
                        <h2>${profileData.name}</h2>
                        <p>Email: ${profileData.email}</p>
                        <p>Member since: ${profileData.joinDate}</p>
                    `;
                })
                .catch(error => {
                    profileSection.innerHTML = 'Failed to load profile';
                });

            const ordersPromise = fetch('/api/userOrders')
                .then(res => res.json())
                .then(ordersData => {
                    ordersSection.innerHTML = `
                        <h3>Recent Orders</h3>
                        <ul>
                            ${ordersData.map(order => `
                                <li>Order #${order.id}: ${order.status}</li>
                            `).join('')}
                        </ul>
                    `;
                })
                .catch(error => {
                    ordersSection.innerHTML = 'Failed to load orders';
                });

            await Promise.all([profilePromise, ordersPromise]);

        } catch (error) {
            console.error('Something went wrong:', error);
        } finally {
            // Reset loading state
            isLoading = false;
            profile.disabled = false;
        }
    }, 300); // 300ms debounce delay
});

// First, set up WebSocket connection
const ws = new WebSocket('wss://api.example.com/updates');

// Listen for real-time updates
ws.addEventListener('message', (event) => {
    const update = JSON.parse(event.data);
    
    // Update cache and UI based on the type of update
    switch(update.type) {
        case 'PROFILE_UPDATE':
            cache.profile = update.data;
            displayProfile(update.data);
            break;
            
        case 'NEW_ORDER':
            if (cache.orders) {
                cache.orders.unshift(update.data); // Add new order to start
                displayOrders(cache.orders);
            }
            break;
            
        case 'ORDER_STATUS_CHANGE':
            if (cache.orders) {
                // Find and update the specific order
                const orderIndex = cache.orders.findIndex(o => o.id === update.data.id);
                if (orderIndex !== -1) {
                    cache.orders[orderIndex] = update.data;
                    displayOrders(cache.orders);
                }
            }
            break;
    }
});

// Handle WebSocket connection status
ws.addEventListener('open', () => {
    console.log('Connected to real-time updates');
});

ws.addEventListener('close', () => {
    console.log('Disconnected from real-time updates');
    // Maybe try to reconnect after a delay
    setTimeout(() => {
        // Reconnect logic
    }, 3000);
});