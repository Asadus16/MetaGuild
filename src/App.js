import { ConnectWallet } from '@thirdweb-dev/react';
import './styles/Home.css';
import logo from '../src/images/logo.png';
import Lottie from 'lottie-react';
import Animation from './animation.json';

export default function Home() {
  return (
    <>
      <main className="main">
        <a href="#">
          <img src={logo} className="logo" />
        </a>
        <ConnectWallet className="connect" />
      </main>
      <div className="description">
        <h1>A platform where every Contributor gets a Chance!</h1>
        <p>
          Create bounties for contributors, let contributors build their<br></br> web3 profile and pay with your own DAO token.
        </p>
      </div>
      <div className="animationDiv">
        <Lottie animationData={Animation} className="animation" />
      </div>
      <div className="buttons">
        <a href="#">
          <button className="button1">Create Project</button>
        </a>
        <a href="#">
          <button className="button2">Explore DAOs</button>
        </a>
      </div>
    </>
  );
}
