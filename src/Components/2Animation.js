import Lottie from 'lottie-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faDatabase } from '@fortawesome/free-solid-svg-icons';
import Animation from '../json_animations/2Animation.json';
import { Link } from 'react-router-dom';

export default function Animation2() {
  return (
    <div className="animation2Div">
      <div className="Animation2Txt">
        <div>
          <h1>Get paid and build your on-chain CV</h1>
        </div>

        <div className="Animation2List1">
          <div>
            <FontAwesomeIcon icon={faWallet} size="2x" />
          </div>
          <li>Get paid directly to your wallet after completing a task.</li>
        </div>
        <br></br>

        <div className="Animation2List2">
          <div>
            <FontAwesomeIcon icon={faDatabase} size="2x" />
          </div>
          <li>Payments you receive are recorded on-chain.</li>
        </div>
        <div className="Animation1Btn1">
          <Link to="/explore">
            <button className="Animation1Btn">Explore DAOs</button>
          </Link>
        </div>
      </div>
      <div className="animation2Container">
        <Lottie animationData={Animation} className="animation2" />
      </div>
    </div>
  );
}
