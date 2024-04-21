import Animation from './json_animations/MainAnim.json';
import Lottie from 'lottie-react';

export default function MainAnimation() {
  return (
    <>
      <div className="MainAnimaContainer">
        <Lottie animationData={Animation} className="MainAnimation" />
      </div>
    </>
  );
}
