import { ConnectWallet } from '@thirdweb-dev/react';
import logo from '../images/logo.png';

export default function Navbar() {
  return (
    <main className="main">
      <a href="#">
        <img src={logo} className="logo" />
      </a>
      <ConnectWallet className="connect" />
    </main>
  );
}
