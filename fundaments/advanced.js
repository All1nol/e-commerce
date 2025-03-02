let todoList = [
    {index: 1, title: "Buy groceries", completed: true},
    {index: 2, title: "Finish project", completed: false},
    {index: 3, title: "Call the bank", completed: true},
];

function updateTodo(id, title, completed,newContent){
    if(id >= 0 && id < todoList.length){
        todoList[id] = newContent;
        console.log("Todo updated successfully");
    }else{
        console.log("Invalid index");
    }
}

updateTodo(1, "Update: Buy groceries", true, {index: 4, title: "Buy groceries", completed: true});

// Assume you have a list of to-do items
let todoItems = ["Buy groceries", "Walk the dog", "Read a book"];

// Function to update a to-do item
function updateTodoItem(index, newContent) {
    // Select the item (simulated here as an array)
    if (index >= 0 && index < todoItems.length) {
        todoItems[index] = newContent;
        console.log(`Updated item: ${todoItems[index]}`);
    } else {
        console.log("Invalid index");
    }
}

updateTodoItem(1, "Walk the cat"); // Updated item: Walk the cat


function simpleFunction(){
    console.log("Hello, world!");
}

function addButtonClickHandler(){
    console.log("Button Event listener added ");
    simpleFunction();
}

addButtonClickHandler();



let items = [
    {id: 1, name: "Item 1"},
    {id: 2, name: "Item 2"},
    {id: 3, name: "Item 3"},
];


function handleItemClick(item){ 
    console.log(`Clicked on ${item.name}`);
}

function simulateEventDelegation(){
    items.forEach(item => {
        handleItemClick(item);
    });
}

simulateEventDelegation();





function fetchData(url){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    return fetch(url).then(response => {if(!response.ok){
        throw new Error("Network response was not ok");
    }
    return response.json();
    })
    .then(data => resolve(data))
    .catch(error => reject(error));
    });
}

fetchData("https://jsonplaceholder.typicode.com/posts")
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });




