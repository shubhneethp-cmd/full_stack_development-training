// Algo Trading Bot Simulation
let balance = 1000;
let holdings = 0;
let stockPrice = 100;

function updatePrice() {
    return Math.floor(Math.random() * 41) + 80; // 80–120
}

function decideAction(price) {
    if (price < 90 && balance >= price) {
        return "BUY";
    }
    if (price > 110 && holdings > 0) {
        return "SELL";
    }
    return "HOLD";
}

function trade(action, price) {
    if (action === "BUY") {
        balance -= price;
        holdings += 1;
    } else if (action === "SELL") {
        balance += price;
        holdings -= 1;
    }
}

for (let round = 1; round <= 10; round++) {
    stockPrice = updatePrice();
    let action = decideAction(stockPrice);
    trade(action, stockPrice);

    console.log(
        `Round ${round}: Stock Price = ${stockPrice} → Action = ${action} → Balance = ${balance}, Holdings = ${holdings}`
    );
}

console.log(`Final Balance: ${balance}, Final Holdings: ${holdings}`);  
// End of Algo Trading Bot Simulation
            