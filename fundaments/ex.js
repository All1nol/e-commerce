const logs =[
    {id:1, type: "visit", ip: '192.168.1.1', timestamp: '2024-01-01'},
    {id:2, type: "visit", ip: '192.168.1.1', timestamp: '2024-01-01'},  
    {id:3, type: "visit", ip: '192.168.1.1', timestamp: '2024-01-01'},
    {id:4, type: "visit", ip: '192.168.1.1', timestamp: '2024-01-01'},
    {id:5, type: "visit", ip: '192.168.1.4', timestamp: '2024-01-01'},
    {id:6, type: "visit", ip: '192.168.1.4', timestamp: '2024-01-01'},
    {id:7, type: "visit", ip: '192.168.1.4', timestamp: '2024-01-01'},
    {id:8, type: "visit", ip: '192.168.1.4', timestamp: '2024-01-01'},
    {id:9, type: "visit", ip: '192.168.1.4', timestamp: '2024-01-01'},
    {id:10, type: "visit", ip: '192.168.1.4', timestamp: '2024-01-01'},
    {id:11, type: "visit", ip: '192.168.1.10', timestamp: '2024-01-01'},
    {id:12, type: "visit", ip: '192.168.1.10', timestamp: '2024-01-01'},
    {id:13, type: "visit", ip: '192.168.1.10', timestamp: '2024-01-01'},
    {id:14, type: "visit", ip: '192.168.1.10', timestamp: '2024-01-01'},
    {id:15, type: "visit", ip: '192.168.1.10', timestamp: '2024-01-01'},
    {id:16, type: "visit", ip: '192.168.1.10', timestamp: '2024-01-01'},
    {id:17, type: "click", ip: '192.168.1.10', timestamp: '2024-01-01'},
    {id:18, type: "click", ip: '192.168.1.17', timestamp: '2024-01-01'},
    {id:19, type: "click", ip: '192.168.1.18', timestamp: '2024-01-01'},
    {id:20, type: "click", ip: '192.168.1.19', timestamp: '2024-01-01'},
    {id:21, type: "click", ip: '192.168.1.20', timestamp: '2024-01-01'},
    {id:22, type: "click", ip: '192.168.1.21', timestamp: '2024-01-01'},
    {id:23, type: "purchase", ip: '192.168.1.22', timestamp: '2024-01-01'},
    {id:24, type: "purchase", ip: '192.168.1.22', timestamp: '2024-01-01'},
    {id:25, type: "purchase", ip: '192.168.1.22', timestamp: '2024-01-01'},
    {id:26, type: "purchase", ip: '192.168.1.22', timestamp: '2024-01-01'},
    {id:27, type: "purchase", ip: '192.168.1.22', timestamp: '2024-01-01'},
    {id:28, type: "purchase", ip: '192.168.1.22', timestamp: '2024-01-01'},
    {id:29, type: "purchase", ip: '192.168.1.22', timestamp: '2024-01-01'},
    {id:30, type: "purchase", ip: '192.168.1.22', timestamp: '2024-01-01'},
]
//log the type:purchase
const totalTypePurchase = logs.filter(log => log.type === "purchase")
console.log(totalTypePurchase);
const lengthTypePurchase= totalTypePurchase.length
console.log(lengthTypePurchase);


//find most frequent user's ip adress and log it 
function mostFrequentIp(logs){
    const map = new Map();
    let mostFrequentIp; 
    let maxCount = 0; 
    for(const log of logs){
        const {ip} = log// const ip = log.ip 
        const currentCount = (map.get(ip) || 0  ) + 1; 
        map.set(ip, currentCount)

        if(currentCount> maxCount){
            maxCount = currentCount;
            mostFrequentIp = {ip}
        }else if (currentCount === maxCount){
            mostFrequentIp = {ip}
        }

    }
    return { 
        mostFrequentIp, maxCount
    }

}

const result = mostFrequentIp(logs)
console.log(result);





// Alternative 1: Using reduce
function mostFrequentIpWithReduce(logs) {
    const  IpCount = logs.reduce((acc, log) => {
        acc[log.ip] = (acc[log.ip ] ||0 ) + 1; 
        return acc; 
    },{}) 

    let maxCount=0 
    let mostFrequentIp;

    for(const [ip,count] of Object.entries(IpCount)){
        if(count>maxCount){
            maxCount = count;
            mostFrequentIp = {ip}
        }else if (count ===maxCount){
            mostFrequentIp.push(ip)
        }
    }
    return {mostFrequentIp,maxCount}
}
const result2 = mostFrequentIpWithReduce(logs)
console.log(result2);

/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function(word1, word2) {
    let result = [];
    const maxLength = Math.max(word1.length, word2.length);
    
    for(let i = 0; i < maxLength; i++) {
        if(i < word1.length) result.push(word1[i]);
        if(i < word2.length) result.push(word2[i]);
    }
    
    return result.join('');
};

// Test cases
console.log(mergeAlternately("abc", "pqr"));     // "apbqcr"
console.log(mergeAlternately("ab", "pqrs"));     // "apbqrs"
console.log(mergeAlternately("abcd", "pq"));     // "apbqcd"





var expect = function(val) {
    return {
        toBe: (param) => {
            if(val === param) {
                return { "value": true };
            } else {
                throw { "error": "Not Equal" };
            }
        },

        notToBe: (param) => {
            if(val !== param) {
                return { "value": true };
            } else {
                throw { "error": "Equal" };
            }
        }
    }
};

 expect(5).toBe(5); // true
  expect(5).notToBe(5); // throws "Equal"