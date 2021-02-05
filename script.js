var addButton = document.getElementById('add-Button');
addButton.addEventListener('click', addItem);
var LBPAmount = document.getElementById('lbp-amount');
var USDAmount = document.getElementById('usd-amount');
var TransactionType = document.getElementById('transaction-type');
var sellUSDTransactions = [];
var buyUSDTransactions = [];



function addItem(){
    console.log('Checking if it works')
    if (TransactionType.value === 'usd-to-lbp'){
        let rate = LBPAmount.value/USDAmount.value;
        sellUSDTransactions.push(rate);
    }
    else{
        let rate = USDAmount.value/LBPAmount.value;
        buyUSDTransactions.push(rate);
    }
    //addButton.reset();
    updateRates();
}

function updateRates(){
    let sellrate = sellUSDTransactions.reduce(function(a,b){ return a+b;},0)/sellUSDTransactions.length;
    let buyrate = buyUSDTransactions.reduce(function(a,b){ return a+b;},0)/buyUSDTransactions.length;
    if (sellrate > 0){
        document.getElementById('sell-usd-rate').innerHTML = sellrate;
    }
    if (buyrate > 0){
        document.getElementById('buy-usd-rate').innerHTML = buyrate;
    }
    
    
   
}

