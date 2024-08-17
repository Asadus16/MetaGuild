// import logo from "../images/logo.png";
// import "../styles/Home.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// // import { ConnectWallet } from '@thirdweb-dev/react';
// import Gif from "../images/90449.jpg";
// import Logo1 from "../images/Logo1.png";
// import { Link } from "react-router-dom";

// import { ConnectButton, useActiveAccount } from "thirdweb/react";
// import { createWallet, walletConnect } from "thirdweb/wallets";
// import { useEffect } from "react";
// // import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
// import React, { useState } from "react";
// import { client } from "../utils/client";
// const Navbar = () => {
//   const account = useActiveAccount();
//   const authToken = localStorage.getItem("authToken");

//   async function authenticate(authToken) {
//     try {
//       const response = await fetch("http://localhost:8000/auth/authenticate", {
//         // Adjust the URL to your backend endpoint
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ contract_address: account.address }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const result = await response.json();

//       // setAuthToken(result);

//       if (!authToken) {
//         console.log("setting...");
//         localStorage.setItem("authToken", result);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }

//   useEffect(() => {
//     if (account) {
//       authenticate(authToken);
//     }
//   }, [account]);

//   // useEffect(() => {
//   //   if (account) {
//   //     authenticate(authToken);
//   //   }
//   // }, [authToken]);

//   // State to manage whether a wallet is connected (optional)
//   const [isConnected, setIsConnected] = useState(false);

//   const wallets = [
//     walletConnect(),
//     createWallet("io.metamask"),
//     createWallet("com.coinbase.wallet"),
//     createWallet("com.trustwallet.app"),
//     createWallet("app.phantom"),
//   ];

//   return (
//     <main className="main">
//       <div>
//         <Link to="/">
//           <img src={logo} className="meta_logo" alt="Logo" />
//         </Link>
//       </div>
//       <div
//         className="nav_profile"
//         style={{ display: "flex", alignItems: "center" }}
//       >
//         <a
//           href="/userprofile"
//           className="user_icon"
//           style={{ marginRight: "1rem" }}
//         >
//           <FontAwesomeIcon icon={faUser} size="5x" color="white" />
//         </a>
//         <div>
//           <ConnectButton
//             client={client}
//             wallets={wallets}
//             theme={"dark"}
//             connectModal={{
//               size: "wide",
//               titleIcon: Logo1,
//               title: "MetaGuild",
//               welcomeScreen: {
//                 title: "MetaGuild streamline your DAO's workflow!",
//                 subtitle: "Connect a wallet to get started",
//                 img: {
//                   src: Gif,
//                   width: 250,
//                   height: 200,
//                 },
//               },
//             }}
//           />
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/logo.png';
import '../styles/Home.css';
import { ConnectButton, useActiveAccount } from 'thirdweb/react';
import { createWallet, walletConnect } from 'thirdweb/wallets';
import { client } from '../utils/client';
import Gif from '../images/90449.jpg';
import Logo1 from '../images/Logo1.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const account = useActiveAccount();
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (account) {
      authenticate(authToken);
    }
  }, [account]);

  async function authenticate(authToken) {
    try {
      const response = await fetch('http://localhost:8000/auth/authenticate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contract_address: account.address }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (!authToken) {
        localStorage.setItem('authToken', result);
      }
    } catch (error) {
      console.error('Error:', error);
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
        <a href="/userprofile" className="user_icon">
          <FontAwesomeIcon icon={faUser} size="2x" color="white" />
        </a>
        <div>
          <ConnectButton
            connectButton={{
              label: 'Connect Wallet',
              width: '400px',
              height: '100px',
            }}
            client={client}
            wallets={[
              walletConnect(),
              createWallet('io.metamask'),
              createWallet('com.coinbase.wallet'),
              createWallet('com.trustwallet.app'),
              createWallet('app.phantom'),
            ]}
            theme={'dark'}
            connectModal={{
              size: 'wide',
              titleIcon: Logo1,
              title: 'MetaGuild',
              welcomeScreen: {
                title: "MetaGuild streamline your DAO's workflow!",
                subtitle: 'Connect a wallet to get started',
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
