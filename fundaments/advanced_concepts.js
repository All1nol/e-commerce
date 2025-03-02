// 1. Closure Example - Create a counter factory
function createCounter(initialValue = 0) {
    let count = initialValue;
    return {
        increment: () => {
            return ++count;
        },
        decrement: () => {
            return --count;
        },
        postfixDecrement: () => {
            return count--;
        },
        getValue: () => {return count},
        reset: () => {return count = initialValue}
    };
}

const counter = createCounter(0);
console.log("increment: " + counter.increment());
console.log("getValue: " + counter.getValue());
console.log("decrement: " + counter.decrement());
console.log("getValue: " + counter.getValue());
console.log("postfixDecrement: " + counter.postfixDecrement());
console.log("getValue: " + counter.getValue());
console.log("reset: " + counter.reset());




// 2. Async Operations - Simulated API calls
async function fetchUserData(userId) {
    // Simulate API delay
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    try {
        await delay(1000); // Simulate network delay
        
        // Simulate different responses
        if (userId < 0) {
            throw new Error('Invalid user ID');
        }
        
        return {
            id: userId,
            name: `User ${userId}`,
            email: `user${userId}@example.com`
        };
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

// 3. Event Loop and Promise Chain Example
function processUserData() {
    console.log('Start');  // 1
    
    setTimeout(() => {
        console.log('Timer 1'); // 5
    }, 0);
    
    Promise.resolve()
        .then(() => console.log('Promise 1')) // 3
        .then(() => console.log('Promise 2')); // 4
    
    console.log('End'); // 2
}

// Try these exercises:
// 1. Create two counters and demonstrate they maintain separate state
// 2. Fetch data for multiple users concurrently using Promise.all
// 3. Explain the order of console.logs in processUserData

// Your code here 

// Let's understand closures with a real-world example
function createBankAccount(initialBalance) {
    let balance = initialBalance; // This is the private variable
    return {
        // These functions "close over" the balance variable
        deposit: (amount) => {
            balance += amount;
            return `New balance: ${balance}`;
        },
        withdraw: (amount) => {
            if (amount > balance) {
                return "Insufficient funds";
            }
            balance -= amount;
            return `New balance: ${balance}`;
        },
        getBalance: () => balance,
        transfer: (amount, targetAccount) => {
            // Check if we have sufficient funds
            if (amount > balance) {
                return "Insufficient funds";
            }
            // Deduct from current account
            balance -= amount;
            // Add to target account using the deposit method
            targetAccount.deposit(amount);
            return `Transfer successful. New balance: ${balance}`;
        }
    }
}
// Try to modify this example:
// 1. Add a new method called 'transfer' that moves money from one account to another
// 2. Add a transaction history feature that keeps track of all deposits and withdrawals

// Usage example
const account1 = createBankAccount(100);
const account2 = createBankAccount(50);

console.log("Initial balances:");
console.log("Account 1:", account1.getBalance()); // Should show 100
console.log("Account 2:", account2.getBalance()); // Should show 50

console.log("\nTransferring 30 from account1 to account2:");
console.log(account1.transfer(30, account2));

console.log("\nFinal balances:");
console.log("Account 1:", account1.getBalance()); // Should show 70
console.log("Account 2:", account2.getBalance()); // Should show 80

function createLibrary() {
    // Private variables
    const books = new Map();  // Store books and their details
    const borrowingHistory = new Map();  // Track who borrowed what
    const lateFeePerDay = 0.50;  // 50 cents per day

    // Helper function to calculate days between dates
    const daysBetween = (date1, date2) => {
        return Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
    };

    return {
        // TODO: Implement these methods
        addBook: (bookId, title, author) => {
            const bookDetails = {
                title: title,
                author: author,
                isAvailable: true,
                currentBorrower: null,
                checkoutDate: null
            };
            books.set(bookId, bookDetails);
            console.log("Current books in library:", books); 
            return `Book added: ${title} by ${author}`;
        },

        checkoutBook: (bookId, userId, checkoutDate) => {
            // Should handle book borrowing
            // Remember to check if book is available
             const existingBook=books.get(bookId)
             existingBook.isAvailable= false
            existingBook.currentBorrower = userId
            existingBook.checkoutDate= checkoutDate
             books.set(bookId,existingBook)
             console.log("test",books);
             
            return `Book:${bookId} taken by ${userId}`
        },

        returnBook: (bookId, userId, returnDate) => {
            // Check if book exists
            const book = books.get(bookId);
            if (!book) {
                return `Error: Book ${bookId} does not exist in the library`;
            }

            // Check if book was borrowed by this user
            if (book.currentBorrower !== userId) {
                return `Error: Book ${bookId} was not checked out by ${userId}`;
            }

            // Calculate days kept and potential late fees
            const daysKept = daysBetween(book.checkoutDate, returnDate);
            const daysOverdue = Math.max(0, daysKept - 14); // Only count days beyond 14-day limit
            
            // Update book status
            book.isAvailable = true;
            book.currentBorrower = null;
            book.checkoutDate = null;
            books.set(bookId, book);

            // Track borrowing history
            const historyEntry = {
                bookId,
                userId,
                checkoutDate: book.checkoutDate,
                returnDate,
                daysKept,
                daysOverdue
            };

            // Add to borrowing history
            if (!borrowingHistory.has(userId)) {
                borrowingHistory.set(userId, []);
            }
            borrowingHistory.get(userId).push(historyEntry);

            // Generate return message
            if (daysOverdue > 0) {
                const lateFee = (daysOverdue * lateFeePerDay).toFixed(2);
                return `Book returned. You kept it for ${daysKept} days. Late fee for ${daysOverdue} overdue days: $${lateFee}`;
            }

            return `Book returned successfully. You kept it for ${daysKept} days. No late fees.`;
        },

        getBookStatus: (bookId) => {
            // Should return book details and availability
        },

        getUserHistory: (userId) => {
            // Should return borrowing history for a user
        }
    };
}

// Example usage (once implemented):
const library = createLibrary();

// Add books
console.log("\nAdding books:");
console.log(library.addBook("B001", "The Great Gatsby", "F. Scott Fitzgerald"));
console.log(library.addBook("B002", "1984", "George Orwell"));

// Checkout a book
console.log(library.checkoutBook("B001", "USER1", new Date("2024-03-15")));

// Check status
console.log(library.getBookStatus("B001"));

// Return book
console.log(library.returnBook("B001", "USER1", new Date("2024-03-20")));

// Check user history
console.log(library.getUserHistory("USER1"));



