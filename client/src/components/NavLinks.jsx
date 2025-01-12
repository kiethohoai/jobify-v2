import links from '../utils/links';
import { NavLink } from 'react-router-dom';
import { useDashboardContext } from '../pages/DashboardLayout';

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <div className="nav-links">
      {links.map(({ text, path, icon }) => (
        <NavLink
          to={path}
          key={text}
          className="nav-link"
          onClick={isBigSidebar ? null : toggleSidebar}
        >
          <span className="icon">{icon}</span>
          {text}
        </NavLink>
      ))}
    </div>
  );
};
export default NavLinks;
