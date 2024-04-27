import Lottie from 'lottie-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoad, faUsers } from '@fortawesome/free-solid-svg-icons';
import Animation from '../json_animations/1Animation.json';
import { Link } from 'react-router-dom';

export default function Animation1() {
  return (
    <div className="animation1Div">
      <div>
        <Lottie animationData={Animation} className="animation1" />
      </div>
      <div className="Animation1Txt">
        <div>
          <h1>Manage tasks and bounties</h1>
        </div>

        <div className="Animation1List1">
          <div>
            <FontAwesomeIcon icon={faRoad} size="2x" />
          </div>

          <li>Clearly communicate your project roadmap and what work needs to be done.</li>
        </div>
        <br></br>

        <div className="Animation1List2">
          <div>
            <FontAwesomeIcon icon={faUsers} size="2x" />
          </div>
          <li>Share context on ongoing initiatives and make it easy to involve new and existing contributors.</li>
        </div>
        <div className="Animation1Btn1">
          <Link to="/create">
            <button className="Animation1Btn">Create DAO</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
