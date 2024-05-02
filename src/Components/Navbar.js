import logo from '../images/logo.png';
// import { ConnectWallet } from '@thirdweb-dev/react';
import Gif from '../images/bitcoin.gif';
import Logo1 from '../images/Logo1.png';

import {
  ThirdwebProvider,
  ConnectButton,
  
} from "thirdweb/react";
import {
  createWallet,
  walletConnect,
} from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";



const ConnectWallet = () => {
  
  const client = createThirdwebClient({
    clientId: "YOUR_CLIENT_ID",
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
              title:
                "MetaGuild streamline your DAO's workflow!",
              subtitle:
                "Connect a wallet to get started",
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
  }


export default function Navbar() {
  return (
    
    <main className="main">
      <a href="#">
        <img src={logo} className="logo" />
      </a>
      <div className="connect">
      <ConnectWallet />
      </div >
    </main>
  );
}

