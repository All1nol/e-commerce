let storedUsername = "user123";
let storedPassword = "password123";

function authenticateUser(inputUsername, inputPassword) {
    if (inputUsername === storedUsername && inputPassword === storedPassword) {
        console.log("Authentication successful");
    } else {
        console.log("Authentication failed");
    }
}

authenticateUser("user123", "password123");
authenticateUser("user123", "wrongpassword");
authenticateUser("wronguser", "password123");


function validateEmail(name,email, age) {
    if(name !== "" && email !== "" && age >0){
        console.log("Validation successful");
    }else{
        console.log("Validation failed");
    }
}

validateEmail("John Doe", "john.doe@example.com", 25);
validateEmail("", "john.doe@example.com", 25);
validateEmail("John Doe", "", 25);
validateEmail("John Doe", "john.doe@example.com", -5);

let isAdmin = true;
let isFeatureEnabled = false; 

function accessFeature(){
    if(isAdmin || isFeatureEnabled){
        console.log("Access granted");
    }else{
        console.log("Access denied");
    }
}

accessFeature();    


function processData(data){
    if(typeof data === "number" && !isNaN(data)){
        console.log("Processing data:", data);
    }else{
        console.log("Invalid data");
    }
}

processData(123);   
processData("123");
processData(NaN);


//Conditional Rendering

let isLoggedIn = false;

function renderContent(){
    if(!isLoggedIn){
        console.log('Render login page');
    }else{
        console.log('Render dashboard');
    }
}

renderContent();


//Asyncronous Operations

let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Data fetched successfully"), 5000);
});

promise.then(result => console.log(result));

async function fetchData(){
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data = await response.json();
    console.log(data);
}

fetchData();


//Error Handling


