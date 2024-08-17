// export default Navbar;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo.png";
import "../styles/Home.css";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createWallet, walletConnect } from "thirdweb/wallets";
import { client } from "../utils/client";
import Gif from "../images/90449.jpg";
import Logo1 from "../images/Logo1.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const account = useActiveAccount();
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (account) {
      authenticate(authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [account]);

  async function authenticate(authToken) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/authenticate`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contract_address: account.address }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (!authToken) {
        localStorage.setItem("authToken", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <main className="main">
      <div>
        <Link to="/">
          <img src={logo} className="meta_logo" alt="Logo" />
        </Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <FontAwesomeIcon
          icon={isMenuOpen ? faTimes : faBars}
          size="2x"
          color="white"
        />
      </div>
      <div className={`nav_profile ${isMenuOpen ? "show" : ""}`}>
        {account ? (
          <a href="/userprofile" className="user_icon" onClick={closeMenu}>
            <FontAwesomeIcon icon={faUser} size="2x" color="white" />
          </a>
        ) : (
          ""
        )}
        <div onClick={closeMenu}>
          <ConnectButton
            style={{
              with: "500px",
            }}
            client={client}
            wallets={[
              walletConnect(),
              createWallet("io.metamask"),
              createWallet("com.coinbase.wallet"),
              createWallet("com.trustwallet.app"),
              createWallet("app.phantom"),
            ]}
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
                  width: 250,
                  height: 200,
                },
              },
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default Navbar;
