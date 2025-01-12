import { useDashboardContext } from '../pages/DashboardLayout.jsx';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Wrapper from '../assets/wrappers/SmallSidebar.js';
import Logo from './Logo.jsx';
import links from '../utils/links.jsx';
import NavLinks from './NavLinks.jsx';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className="content">
          {/* close button */}
          <button className="close-btn" type="button" onClick={toggleSidebar}>
            <FaTimes />
          </button>

          {/* logo */}
          <header>
            <Logo />
          </header>

          {/* navigate links */}
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
