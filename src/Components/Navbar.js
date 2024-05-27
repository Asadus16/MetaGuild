import logo from "../images/logo.png";
import "../styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { ConnectWallet } from '@thirdweb-dev/react';
import Gif from "../images/bitcoin.gif";
import Logo1 from "../images/Logo1.png";
import { Link } from "react-router-dom";

import {
  ThirdwebProvider,
  ConnectButton,
  useActiveAccount,
} from "thirdweb/react";
import { createWallet, walletConnect } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";
import { useEffect } from "react";
import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
import React, { useState } from "react";

const Navbar = () => {
  const account = useActiveAccount();
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  // const authToken = localStorage.getItem("authToken");
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  async function authenticate(authToken) {
    try {
      const response = await fetch("http://localhost:8000/auth/authenticate", {
        // Adjust the URL to your backend endpoint
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contract_address: account.address }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      // setAuthToken(result);

      if (!authToken) {
        console.log("setting...");
        localStorage.setItem("authToken", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    if (account) {
      authenticate(authToken);
    }
  }, [account]);

  useEffect(() => {
    if (account) {
      authenticate(authToken);
    }
  }, [authToken]);

  // State to manage whether a wallet is connected (optional)
  const [isConnected, setIsConnected] = useState(false);

  const ConnectWallet = () => {
    const client = createThirdwebClient({
      clientId: process.env.REACT_APP_TEMPLATE_CLIENT_ID,
    });

    const wallets = [
      walletConnect(),
      createWallet("io.metamask"),
      createWallet("com.coinbase.wallet"),
      createWallet("com.trustwallet.app"),
      createWallet("app.phantom"),
    ];

    return (
      <ThirdwebProvider>
        <ConnectButton
          client={client}
          wallets={wallets}
          theme={"dark"}
          connectModal={{
            size: "wide",
            titleIcon: Logo1,
            title: "MetaGuild",
            welcomeScreen: {
              title: "MetaGuild streamline your DAO's workflow!",
              subtitle: "Connect a wallet to get started",
              img: {
                src: Gif,
                width: 200,
                height: 200,
              },
            },
          }}
        />
      </ThirdwebProvider>
    );
  };

  return (
    <main className="main">
      <div>
        <Link to="/">
          <img src={logo} className="meta_logo" alt="Logo" />
        </Link>
      </div>
      <div
        className="nav_profile"
        style={{ display: "flex", alignItems: "center" }}
      >
        <a
          href="/userprofile"
          className="user_icon"
          style={{ marginRight: "1rem" }}
        >
          <FontAwesomeIcon icon={faUser} size="5x" color="white" />
        </a>
        <div>
          {account ? (
            <div>
              <div className="address">
                {" "}
                {account.address.substring(0, 4) +
                  "..." +
                  account.address.substring(account.address.length - 4)}
              </div>
              <button onClick={disconnect} style={{ padding: "0.2rem 0.5rem" }}>
                Disconnect
              </button>
            </div>
          ) : (
            <ConnectWallet className="connect" onClick={connectWithMetamask} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Navbar;
