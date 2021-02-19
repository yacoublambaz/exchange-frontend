
import './App.css';

function App() {
  return (<div>
    <div className = "header">
        <h1>The boss LBP Exchange Tracker</h1>
    </div>
    <div className = "wrapper">
        <h2>Todays Exchange Rate: </h2>
        <p> LBP to USD Exchange Rate</p>
        <h3>Buy USD: <span id = "buy-usd-rate">Not Available</span></h3>
        <h3>Sell USD: <span id = "sell-usd-rate">Not Available</span></h3>
        <hr/>
        <h2>Record a Recent Transaction</h2>
        <form name = "transaction-entry">
            <div className = "amount-input">
                <label htmlFor="lbp-amount"> LBP Amount </label>
                <input id = "lbp-amount" type="number"></input>
            </div>
            <div className = "amount-input">
                <label htmlFor="usd-amount"> USD Amount </label>
                <input id = "usd-amount" type="number"></input>
            </div>
            <select id = "transaction-type">
                <option value="usd-to-lbp">USD to LBP</option>
                <option value="lbp-to-usd">LBP to USD</option>
            </select>
            <button id = "add-Button" className = "button" type = "button"> Add </button>
        </form>
    </div>
    </div>

  );
}

export default App;
