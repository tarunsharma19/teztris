import { useState } from "react";
import styles from "./scss/Navbar.scss";
import teztileLogo from "../../img/tezTile.png"
import { useDispatch } from "react-redux";
import { connectSocketThunk } from "../../api/socketSlice";
import { CheckIfWalletConnected, DisconnectWalletAPI, FetchWalletAPI, wallet } from "../../api/operations/wallet";


function Navbar() {
  const [walletButtonText, setWalletButtonText] = useState("Connect Wallet");
  const [walletConnected, setWalletConnected] = useState(false);

  const dispatch = useDispatch();

  async function connectWallet() {
    if (walletConnected) {
      const disconnect = await DisconnectWalletAPI()
      console.log(disconnect)
      setWalletButtonText("Connect Wallet");
      setWalletConnected(false);
    } else {
      const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        alert('Wallet connection failed');
      }
      const account = await FetchWalletAPI();
      console.log(account.wallet)
      dispatch(connectSocketThunk(account.wallet));
      setWalletButtonText(account.wallet);
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
        {walletButtonText}
      </button>
    </nav>
  );
}

export default Navbar;
