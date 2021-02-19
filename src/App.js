
import './App.css';
import { useState } from "react";
import { useEffect } from "react";

var SERVER_URL = "http://127.0.0.1:5000"
function App() {
  let [buyUsdRate, setBuyUsdRate] = useState(0);
  let [sellUsdRate, setSellUsdRate] = useState(0);
  let TransactionType = document.getElementById('transaction-type');
  let [lbpInput,setLbpInput] = useState("");
  let [usdInput,setUsdInput] = useState("");
  let [transactionType,setTransactionType] = useState("usd-to-lbp");

  function fetchRates() {
   fetch(`${SERVER_URL}/exchangeRate`)
   .then(function(response){
     return response.json();
   }).then(function(obj){
    setBuyUsdRate(obj.lbp_to_usd);
    setSellUsdRate(obj.usd_to_lbp);

   })
 }
useEffect(fetchRates, []);



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
    let usd = usdInput.usdInput;
    let lbp = lbpInput.lbpInput;
    //addButton.reset();
    postData('http://127.0.0.1:5000/', {'usd':usdInput,'lbp':lbpInput,'usd_to_lbp':TransactionType.value })

}



  return (<div>
    <div className = "header">
        <h1>The boss LBP Exchange Tracker</h1>
    </div>
    <div className = "wrapper">
        <h2>Todays Exchange Rate: </h2>
        <p> LBP to USD Exchange Rate</p>
        <h3>Buy USD: <span id = "buy-usd-rate">{buyUsdRate}</span></h3>
        <h3>Sell USD: <span id = "sell-usd-rate">{sellUsdRate}</span></h3>
        <hr/>
        <h2>Record a Recent Transaction</h2>
        <form name = "transaction-entry">
            <div className = "amount-input">
                <label htmlFor="lbp-amount"> LBP Amount </label>
                <input id="lbp-amount" type="number" value={lbpInput} onChange={e =>
                  setLbpInput(e.target.value)}/>
            </div>
            <div className = "amount-input">
                <label htmlFor="usd-amount"> USD Amount </label>
                <input id="usd-amount" type="number" value={usdInput} onChange={e =>
                  setUsdInput(e.target.value)}/>
            </div>
            <select id = "transaction-type">
                <option value="usd-to-lbp">USD to LBP</option>
                <option value="lbp-to-usd">LBP to USD</option>
            </select>
            <button id = "add-Button" className = "button" type = "button" onClick = {addItem}> Add </button>
        </form>
    </div>
    </div>

  );
}

export default App;
