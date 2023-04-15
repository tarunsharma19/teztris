import { useContext, useState } from "react";
import styles from "./scss/Navbar.scss";
import teztileLogo from "../../img/tezTile.png"
import { useDispatch } from "react-redux";
import { connectSocketThunk } from "../../api/socketSlice";
import { CheckIfWalletConnected, DisconnectWalletAPI, FetchWalletAPI, wallet } from "../../api/operations/wallet";
import { manageFunc } from "../../App";


function Navbar() {
  const [walletButtonText, setWalletButtonText] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const { userWallet, setUsetWallet } = useContext(manageFunc);


  const dispatch = useDispatch();

  async function connectWallet() {
    if (walletConnected) {
      const disconnect = await DisconnectWalletAPI()
      console.log(disconnect)
      setWalletConnected(false);
      setWalletButtonText(null);
      setUsetWallet(null);
    } else {
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
  }

  return (
    <nav className={styles.nav}>
      <img
        src={teztileLogo}
        alt="Logo"
        className={styles.logo}
      />

      <button
        onClick={connectWallet}
        className={styles.button}
      >
        {walletConnected ? walletButtonText.slice(0,5)+"..."+walletButtonText.slice(-4) : "Connect Wallet"}
      </button>
    </nav>
  );
}

export default Navbar;
