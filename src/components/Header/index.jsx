import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AppRoutes from '../../constants/Routes';
import ThemeToggle from '../ThemeToggle';

import './index.scss';

function Header() {
  const [showNavItems, setShowNavItems] = useState(false);

  const toggleNavItemVisibility = () => {
    setShowNavItems((prev) => !prev);
  };

  const closeNavItems = () => {
    setShowNavItems(false);
  };

  return (
    <header className="HeaderComponent">
      <Link className="logo" to={AppRoutes.Home}>
        Home
      </Link>
      <button
        className="hamburger"
        onClick={toggleNavItemVisibility}
        onBlur={closeNavItems}
      >
        <span></span>
      </button>
      <ThemeToggle className="HeaderComponent__theme-toggle" />
      <nav className={`nav-items ${showNavItems ? 'visible' : ''}`}>
        <ul>
          <li>
            <NavLink to={AppRoutes.ResumeBuilder} className={({ isActive }) => isActive ? 'active' : ''}>
            Resume Builder
            </NavLink>
          </li>
          <li>
            <NavLink to={AppRoutes.TechBlogs} className={({ isActive }) => isActive ? 'active' : ''}>
            Tech Blogs
            </NavLink>
          </li>
          <li>
            <NavLink to={AppRoutes.PersonalBlogs} className={({ isActive }) => isActive ? 'active' : ''}>
            Personal Blogs
            </NavLink>
          </li>
          <li>
            <NavLink to={AppRoutes.AboutMe} className={({ isActive }) => isActive ? 'active' : ''}>
              About me
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
