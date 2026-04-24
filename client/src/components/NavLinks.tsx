import { useDashboardContext } from '../pages/DashboardLayout';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';

interface Props {
  isBigSidebar?: boolean;
}

const NavLinks = ({ isBigSidebar }: Props) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        if (path === 'admin' && role !== 'admin') return null;
        return (
          <NavLink
            to={path}
            key={text}
            className='nav-link'
            onClick={isBigSidebar ? undefined : toggleSidebar}
            end
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
