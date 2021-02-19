var addButton = document.getElementById('add-Button');
addButton.addEventListener('click', addItem);
var LBPAmount = document.getElementById('lbp-amount');
var USDAmount = document.getElementById('usd-amount');
var TransactionType = document.getElementById('transaction-type');
var sellUSDTransactions = [];
var buyUSDTransactions = [];
var SERVER_URL = "http://127.0.0.1:5000"


function fetchRates() {
 fetch('http://127.0.0.1:5000/exchangeRate')
 .then(response => response.json())
 .then(data => console.log(data));
}
fetchRates();

async function postData(url = '', data = {}) {

  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}




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
    postData('http://127.0.0.1:5000/', {'usd':USDAmount.value,'lbp':LBPAmount.value,'usd_to_lbp':TransactionType.value })

}
