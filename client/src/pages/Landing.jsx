import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <Logo />

      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>job tracking app</h1>
          <p>
            {`I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.`}
          </p>

          {/* btn */}
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>

        {/* image */}
        <img className="img main-img" src={main} alt="main image" />
      </div>
    </Wrapper>
  );
};
export default Landing;
