import logo from '../images/logo.png';
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { ConnectWallet } from '@thirdweb-dev/react';
import Gif from '../images/bitcoin.gif';
import Logo1 from '../images/Logo1.png';

import { ThirdwebProvider, ConnectButton } from 'thirdweb/react';
import { createWallet, walletConnect } from 'thirdweb/wallets';
import { createThirdwebClient } from 'thirdweb';

const ConnectWallet = () => {
  const client = createThirdwebClient({
    clientId: 'YOUR_CLIENT_ID',
  });

  const wallets = [
    walletConnect(),
    createWallet('io.metamask'),
    createWallet('com.coinbase.wallet'),
    createWallet('com.trustwallet.app'),
    createWallet('app.phantom'),
  ];
  return (
    <ThirdwebProvider>
      <ConnectButton
        client={client}
        wallets={wallets}
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
              width: 200,
              height: 200,
            },
          },
        }}
      />
    </ThirdwebProvider>
  );
};

export default function Navbar() {
  return (
    <main className="main">
      <div>
        <a href="#">
          <img src={logo} className="meta_logo" alt="Logo" />
        </a>
      </div>
      <div className="nav_profile">
        <a href="/userprofile" className="user_icon">
          <FontAwesomeIcon icon={faUser} size="5x" color="white" />
        </a>
        <>
          <ConnectWallet className="connect" />
        </>
      </div>
    </main>
  );
}
