import { useState } from "react";
import styles from "./scss/Navbar.scss";
import teztileLogo from "../../img/tezTile.png"

function Navbar() {
  const [walletButtonText, setWalletButtonText] = useState("Connect Wallet");
  const [walletConnected, setWalletConnected] = useState(false);

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
