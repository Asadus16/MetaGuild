import { ConnectWallet } from '@thirdweb-dev/react';
import logo from '../images/logo.png';
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
