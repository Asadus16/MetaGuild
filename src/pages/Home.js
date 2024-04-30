import '../styles/Home.css';
import Lottie from 'lottie-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faShieldHalved, faGhost } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Components/Navbar';
import Footer from '../Components/footer';
import Animation from '../json_animations/animation.json';
import Animation1 from '../Components/1Animation';
import Animation2 from '../Components/2Animation';
import Animation3 from '../Components/3Animation';
import MainAnimation from '../Components/MainAnimation';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="description">
        <h1>A platform where every Contributor gets a Chance!</h1>
        <br />
        <p>
          Create bounties for contributors, let contributors build their<br></br> web3 profile and pay with your own DAO token.
        </p>
      </div>
      <div className="animationDiv">
        <Lottie animationData={Animation} className="animation" />
      </div>
      <div className="buttons">
        <Link to="/create">
          <button className="create_button">Create DAO</button>
        </Link>
        <Link to="/explore">
          <button className="explore_button">Explore DAOs</button>
        </Link>
      </div>
      <Animation1 />
      <Animation2 />
      <Animation3 />
      <MainAnimation />

      <div className="Panel">
        <div className="title">
          <h2>Built for decentralized organizations</h2>
        </div>

        <div className="cards">
          <div className="card1">
            <div className="walletLogo">
              <FontAwesomeIcon icon={faWallet} size="3x" color="purple" />
            </div>
            <div className="TextCard1">
              <h2>Pay with your wallet</h2>
              <p>Meta Guild works with Gnosis Safe, Metamask, Wallet Connect, Phantom, and more</p>
            </div>
          </div>
          <div className="card2">
            <div className="ShieldLogo">
              <FontAwesomeIcon icon={faShieldHalved} size="3x" color="purple" />
            </div>
            <div className="TextCard2">
              <h2>Data Integrity</h2>
              <p>With Meta Guild, the user's data would be safe from malicious acts</p>
            </div>
          </div>
          <div className="card3">
            <div className="GhostLogo">
              <FontAwesomeIcon icon={faGhost} size="3x" color="purple" />
            </div>
            <div className="TextCard3">
              <h2>Stay Annonymous</h2>
              <p>Contribute in the ecosystem while maintaining your transparency</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
