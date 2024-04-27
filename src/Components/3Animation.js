import Lottie from 'lottie-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faRectangleList } from '@fortawesome/free-solid-svg-icons';
import Animation from '../json_animations/3Animation.json';
import { Link } from 'react-router-dom';

export default function Animation3() {
  return (
    <div className="animation3Div">
      <div>
        <Lottie animationData={Animation} className="animation3" />
      </div>
      <div className="Animation3Txt">
        <div>
          <h1>Track everything in one place</h1>
        </div>

        <div className="Animation3List1">
          <div>
            <FontAwesomeIcon icon={faBell} size="2x" />
          </div>
          <li>Stay up to date with new opportunities in your task feed .</li>
        </div>
        <br></br>

        <div className="Animation3List2">
          <div>
            <FontAwesomeIcon icon={faRectangleList} size="2x" />
          </div>
          <li>All your tasks in your task board.</li>
        </div>
        <div className="Animation3Btn1">
          <Link to="/explore">
            <button className="Animation3Btn">Explore DAOs</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
