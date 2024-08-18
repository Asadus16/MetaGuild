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
import { fetchMyself } from "../utils/fetchers";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const account = useActiveAccount();
  const authToken = localStorage.getItem("authToken");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchMyself(authToken).then((response) => setFormData({ ...response }));
  }, []);

  useEffect(() => {
    if (account) {
      authenticate(authToken);
      fetchMyself(authToken).then((response) => setFormData({ ...response }));
    } else {
      localStorage.removeItem("authToken");
      localStorage.removeItem("profile");
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

      <div className={`nav_profile`}>
        {account ? (
          <a href="/userprofile" className="user_icon">
            <FontAwesomeIcon icon={faUser} size="2x" color="white" />
          </a>
        ) : (
          ""
        )}
        <div>
          <ConnectButton
            connectButton={{
              label: "Connect Wallet",
              width: "400px",
              height: "100px",
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
