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

//total click log

// const filteredClicks= logs.filter(log=> log.type === "purchase")
// const lengthOfFilteredClicks = filteredClicks.length

// console.log(lengthOfFilteredClicks);

//find most frequent user's ip adress and log it 

function findMostFrequentIp(logs){
    const map = new Map();
    let maxCount = 0;
    let mostFrequentIps = [];

    // First pass: count frequencies and find maxCount
    for (const log of logs){
        const {ip} = log;
        const currentCount = (map.get(ip) || 0) + 1;
        map.set(ip, currentCount);
        
        if(currentCount > maxCount){
            maxCount = currentCount;
            mostFrequentIps = [ip];
        } else if(currentCount === maxCount) {
            mostFrequentIps.push(ip);
        }
    }

    console.log('IP Frequencies:', map);
    console.log('Maximum frequency:', maxCount);
    console.log('IPs with maximum frequency:', mostFrequentIps);
    
    return {
        ips: mostFrequentIps,
        count: maxCount
    };
}

const result = findMostFrequentIp(logs);
console.log('Result:', result);
