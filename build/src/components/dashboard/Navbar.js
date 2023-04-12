import { useState } from "react";
import styles from "./scss/Navbar.scss";
import teztileLogo from "../../img/tezTile.png"
import { useDispatch } from "react-redux";
import { connectSocketThunk } from "../../api/socketSlice";


function Navbar() {
  const [walletButtonText, setWalletButtonText] = useState("Connect Wallet");
  const [walletConnected, setWalletConnected] = useState(false);

  const dispatch = useDispatch();

  const auth = 'tz12asdfasd34'; // example auth token



  function connectWallet() {
    // Check if the wallet is already connected
    if (walletConnected) {
      // Implement your wallet disconnection logic here
      // For demonstration purposes, let's just set the button text to "Connect Wallet"
      setWalletButtonText("Connect Wallet");
      setWalletConnected(false);
    } else {
      // Implement your wallet connection logic here
      // For demonstration purposes, let's just set the button text to "Connected"
      dispatch(connectSocketThunk(auth));
      setWalletButtonText("Connected");
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
