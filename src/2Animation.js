import Lottie from 'lottie-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faDatabase } from '@fortawesome/free-solid-svg-icons';
import Animation from './json_animations/2Animation.json';

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
          <li>Tasks you complete are stored on-chain.</li>
        </div>
        <div className="Animation1Btn1">
          <a href="#">
            <button className="Animation1Btn">Explore DAOs</button>
          </a>
        </div>
      </div>
      <div>
        <Lottie animationData={Animation} className="animation2" />
      </div>
    </div>
  );
}
