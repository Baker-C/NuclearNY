import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavLink.module.css';

interface NavLinkProps {
  title: string;
  href: string;
  hasDropdown?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({
  title,
  href,
  hasDropdown = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  if (hasDropdown) {
    return (
      <div
        className={styles.navLinkWrapper}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Link to={href} className={styles.navLink}>
          {title}
        </Link>
        <span className={styles.dropdownArrow}>▼</span>
      </div>
    );
  }

  return (
    <Link to={href} className={styles.navLink}>
      {title}
    </Link>
  );
};

