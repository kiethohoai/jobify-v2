import { useDashboardContext } from '../pages/DashboardLayout.jsx';
import { FaAlignLeft } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/Navbar.js';
import Logo from './Logo';

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className="nav-center">
        {/* toggle sidebar */}
        <button
          className="toggle-btn"
          type="button"
          onClick={() => toggleSidebar()}
        >
          <FaAlignLeft />
        </button>

        {/* logo/dashboard */}
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>

        {/* toggle logout user */}
        <div className="btn-container">Logout</div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
