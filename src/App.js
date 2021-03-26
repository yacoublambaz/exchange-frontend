
import './App.css';
import { useState } from "react";
import { useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import UserCredentialsDialog from './UserCredentialsDialog/UserCredentialsDialog.js'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/alert'
import { getUserToken, saveUserToken } from
"./localStorage";


var SERVER_URL = "http://127.0.0.1:5000"
function App() {
  let [buyUsdRate, setBuyUsdRate] = useState(0);
  let [sellUsdRate, setSellUsdRate] = useState(0);
  let TransactionType = document.getElementById('transaction-type');
  let [lbpInput,setLbpInput] = useState("");
  let [usdInput,setUsdInput] = useState("");
  let [transactionType,setTransactionType] = useState("usd-to-lbp");
   let [userToken, setUserToken] = useState(getUserToken())

  const States = {
 PENDING: "PENDING",
 USER_CREATION: "USER_CREATION",
 USER_LOG_IN: "USER_LOG_IN",
 USER_AUTHENTICATED: "USER_AUTHENTICATED",
};
  let [authState, setAuthState] = useState(States.PENDING)
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

function logout() {
 setUserToken(null);
 saveUserToken(null);
}

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
function login(username, password) {
 return fetch(`${SERVER_URL}/auth`, {
 method: "POST",
 headers: {
 "Content-Type": "application/json",
 },
 body: JSON.stringify({
 user_name: username,
 password: password,
 }),
 })
 .then((response) => response.json())
 .then((body) => {
 setAuthState(States.USER_AUTHENTICATED);
 setUserToken(body.token);
 saveUserToken(body.token);
 });
 }


 function createUser(username, password) {
 return fetch(`${SERVER_URL}/user`, {
 method: "POST",
 headers: {
 "Content-Type": "application/json",
 },
 body: JSON.stringify({
 user_name: username,
 password: password,
 }),
 }).then((response) => login(username, password));
 }





function addItem(){
    let usd = usdInput.usdInput;
    let lbp = lbpInput.lbpInput;
    //addButton.reset();
    postData('http://127.0.0.1:5000/', {'usd':usdInput,'lbp':lbpInput,'usd_to_lbp':TransactionType.value })
}

  return (<div>
    <Snackbar
     elevation={6}
     variant="filled"
     open={authState === States.USER_AUTHENTICATED}
     autoHideDuration={2000}
     onClose={() => setAuthState(States.PENDING)}
    >
     <Alert severity="success">Success</Alert>
    </Snackbar>
    {authState === States.USER_CREATION &&
    <UserCredentialsDialog open = {true} title = "Register" submitText = "Submit" onClose={()=> setAuthState(States.PENDING)} onSubmit={(username,password)=>createUser(username,password) }/>}
    {authState === States.USER_LOG_IN &&
    <UserCredentialsDialog open = {true} title = "Login" submitText = "Submit" onClose={()=> setAuthState(States.PENDING)} onSubmit={(username,password)=>login(username, password)}/>}
    <div>
    <AppBar position="static">
    <Toolbar classes={{ root: "nav" }}>
    <Typography variant="h5"style={{ flex: 1 }}>The BOSS LBP exchange tracker</Typography>

    {userToken !== null ? (
 <Button color="inherit" onClick={logout}>Logout</Button>) : (<div>
   <Button
 color="inherit"
 onClick={() => setAuthState(States.USER_CREATION)}
 >Register</Button>
 <Button
 color="inherit"
 onClick={() => setAuthState(States.USER_LOG_IN)}>Login</Button>
 </div>
)}
    </Toolbar>
    </AppBar>

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
