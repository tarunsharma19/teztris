import { useContext, useEffect, useState } from "react";
import styles from "./scss/Navbar.scss";
import teztileLogo from "../../img/tezTile.png"
import { useDispatch } from "react-redux";
import { connectSocketThunk } from "../../api/socketSlice";
import { CheckIfWalletConnected, DisconnectWalletAPI, FetchWalletAPI, wallet } from "../../api/operations/wallet";
import { manageFunc } from "../../App";
import { useNavigate } from "react-router-dom";
import { ConnectWalletAPI } from "../../api/operations/wallet";


function Navbar() {
  const [walletButtonText, setWalletButtonText] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const { userWallet, setUsetWallet } = useContext(manageFunc);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function connectWallet() {
    if (walletConnected) {
      const disconnect = await DisconnectWalletAPI()
      console.log(disconnect)
      setWalletConnected(false);
      setWalletButtonText(null);
      setUsetWallet(null);
    } else {
      const account = await ConnectWalletAPI()
      if (!account.success) {
        alert('Wallet connection failed');
      }
      console.log(account.wallet)
      dispatch(connectSocketThunk(account.wallet));
      setWalletButtonText(account.wallet);
      setUsetWallet(account.wallet);
      setWalletConnected(true);
      
    }
  }

  async function autoFetchWallet() {
    const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        alert('Wallet connection failed');
      }
      const account = await FetchWalletAPI();
      console.log(account.wallet)
      dispatch(connectSocketThunk(account.wallet));
      setWalletButtonText(account.wallet);
      setUsetWallet(account.wallet);
      setWalletConnected(true);
  }

  useEffect(()=>{
    autoFetchWallet()
  },[])
  
  return (
    <nav className={styles.nav}>
      <div className="logo-container" onClick={()=>(navigate("/home"))}>
        <img
          src={teztileLogo}
          alt="Logo"
          className={styles.logo}
        />
      </div>

      <div className="walletContainer">
        {walletConnected && (
          <img
            src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
            alt="Profile"
            className="profileImg"
            onClick={() => navigate('/profile')}
          />
        )}
        <button
          onClick={connectWallet}
          className={styles.button}
        >
          {walletConnected ? walletButtonText.slice(0,5)+"..."+walletButtonText.slice(-4) : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
