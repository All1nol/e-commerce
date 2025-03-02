// 1. Complete this function that takes an array of numbers
// and returns a new array with only even numbers

let array = [1,2,3,4,5,6]
function filterEvenNumbers(array) {
    const filteredArray = array.filter(num => num % 2 === 0)
    return filteredArray
  }

  const result = filterEvenNumbers(array)
  console.log(result);
  
  // 2. Complete this function that takes an array of objects
  // and returns an array of just the names
  const users = [
    { id: 1, name: 'John', age: 25 , index:2321},
    { id: 2, name: 'Jane', age: 30 }
  ];
  
  function getNames(users) {
  return users.map(user => user.name)
}

const names = getNames(users)
console.log(names);



// Given an array of products with prices, calculate the total price
// of all products that cost more than $10
const products = [
  { name: 'Apple', price: 0.5 },
  { name: 'Book', price: 15 },
  { name: 'Computer', price: 1000 },
  { name: 'Pen', price: 1 }
];

function calculateExpensiveTotal(products) {
  const filteredProducts = products.filter(product => product.price >= 10)
  const reducer = filteredProducts.reduce((accmulator, currentValue) => {return accmulator + currentValue.price},0)
  return reducer;
  
}

const result3 = calculateExpensiveTotal(products)
console.log(result3);

// Advanced Problem: Analytics Dashboard
// You have an array of user activities on a website.
// Create functions to:
// 1. Group activities by user
// 2. Find the most active user (most activities)
// 3. Calculate the average number of activities per user
// 4. Find the most common activity type

const activities = [
  { userId: 1, type: 'click', page: 'home', timestamp: '2023-01-01T10:00:00Z' },
  { userId: 2, type: 'view', page: 'products', timestamp: '2023-01-01T10:05:00Z' },
  { userId: 1, type: 'view', page: 'products', timestamp: '2023-01-01T10:10:00Z' },
  { userId: 3, type: 'click', page: 'products', timestamp: '2023-01-01T10:15:00Z' },
  { userId: 1, type: 'add_to_cart', page: 'products', timestamp: '2023-01-01T10:20:00Z' },
  { userId: 2, type: 'add_to_cart', page: 'products', timestamp: '2023-01-01T10:25:00Z' },
  { userId: 3, type: 'view', page: 'cart', timestamp: '2023-01-01T10:30:00Z' },
  { userId: 1, type: 'checkout', page: 'cart', timestamp: '2023-01-01T10:35:00Z' },
  { userId: 3, type: 'checkout', page: 'cart', timestamp: '2023-01-01T10:40:00Z' },
  { userId: 2, type: 'view', page: 'home', timestamp: '2023-01-01T10:45:00Z' },
];

// 1. Group activities by user
function groupActivitiesByUser(activities) {

  const reduceActivitiesByUser = activities.reduce((accmulator , activity) =>{
    if (accmulator[activity.userId]) {
      accmulator[activity.userId].push(activity);
    }else{
      accmulator[activity.userId] = [activity]
    }
    return accmulator;
  },{});
  return reduceActivitiesByUser;
}

// 2. Find the most active user (most activities)
function findMostActiveUser(activities) {
  let mostActiveUserId;
  let highestActivityCount = 0;
  for(const [key,value] of Object.entries(groupActivitiesByUser(activities))){
    let {length} = value;
    if (length > highestActivityCount) {
      highestActivityCount = length;
      mostActiveUserId= Number(key)
    }
    
  }
  return mostActiveUserId
  // Return the userId of the most active user
}

// 3. Calculate the average number of activities per user
function calculateAverageActivitiesPerUser(activities) {
  getTotalActivities = activities.length
  console.log(getTotalActivities);
  groupActivity = groupActivitiesByUser(activities)
  const uniqueUser = Object.keys(groupActivity).length
  console.log(uniqueUser);
    
  let calculateAverageActivitiesPerUser= getTotalActivities/uniqueUser;
  return calculateAverageActivitiesPerUser
}

// 4. Find the most common activity type
function findMostCommonActivityType(activities) {
  const typeCounts = activities.reduce((counts, activity) => {
    let {type} = activity
    if (counts[type]) {
      counts[type] += 1; 
    }else{
      counts[type]=1;
    }
    console.log(counts);
     return counts;
  } ,{})

  let mostCommonType;
  let highestCount= 0;

  for(const [type,count] of Object.entries(typeCounts)) {
    if (count> highestCount) {
      highestCount = count;
      mostCommonType= type
    }
  }
return mostCommonType;
  // Return the most common activity type (e.g., 'view', 'click', etc.)
}

// Test your functions
console.log("Activities grouped by user:", groupActivitiesByUser(activities));
console.log("Most active user:", findMostActiveUser(activities));
console.log("Average activities per user:", calculateAverageActivitiesPerUser(activities));
console.log("Most common activity type:", findMostCommonActivityType(activities));

// Let's create a more complex data transformation problem
// This simulates data you might need to process in a React application

const salesData = [
  { date: '2023-01-01', product: 'Laptop', category: 'Electronics', price: 1200, quantity: 5, storeId: 1 },
  { date: '2023-01-01', product: 'Phone', category: 'Electronics', price: 800, quantity: 10, storeId: 2 },
  { date: '2023-01-02', product: 'TV', category: 'Electronics', price: 1500, quantity: 2, storeId: 1 },
  { date: '2023-01-02', product: 'Headphones', category: 'Electronics', price: 100, quantity: 20, storeId: 2 },
  { date: '2023-01-03', product: 'Shirt', category: 'Clothing', price: 25, quantity: 100, storeId: 1 },
  { date: '2023-01-03', product: 'Pants', category: 'Clothing', price: 35, quantity: 80, storeId: 2 },
  { date: '2023-01-04', product: 'Shoes', category: 'Clothing', price: 50, quantity: 50, storeId: 1 },
  { date: '2023-01-04', product: 'Hat', category: 'Clothing', price: 15, quantity: 200, storeId: 2 },
  { date: '2023-01-05', product: 'Book', category: 'Books', price: 20, quantity: 150, storeId: 1 },
  { date: '2023-01-05', product: 'Magazine', category: 'Books', price: 10, quantity: 300, storeId: 2 },
];

// 1. Calculate total revenue by category
function getTotalRevenueByCategory(data) {
  
  // Return an object with categories as keys and total revenue as values
  // Revenue = price * quantity
}

// 2. Find the day with the highest sales
function getDayWithHighestSales(data) {
  // Your code here
  // Return the date with the highest total sales
}

// 3. Transform the data for a chart showing sales by store
// The result should be in this format:
// [
//   { storeId: 1, totalSales: 1234 },
//   { storeId: 2, totalSales: 5678 }
// ]
function getSalesByStore(data) {
  // Your code here
}

// 4. Create a function that returns the top 3 best-selling products by quantity
function getTopSellingProducts(data, limit = 3) {
  // Your code here
  // Return an array of objects with product name and total quantity sold
}

// Test your functions
console.log("Revenue by category:", getTotalRevenueByCategory(salesData));
console.log("Day with highest sales:", getDayWithHighestSales(salesData));
console.log("Sales by store:", getSalesByStore(salesData));
console.log("Top selling products:", getTopSellingProducts(salesData));
