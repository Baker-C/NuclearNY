import React from 'react';
import { Link } from 'react-router-dom';
import { NavBarVariant } from '@/providers/NavBarProvider';
import styles from './NavLink.module.css';

interface NavLinkProps {
  title: string;
  href: string;
  hasDropdown?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  variant?: NavBarVariant;
}

export const NavLink: React.FC<NavLinkProps> = ({
  title,
  href,
  hasDropdown = false,
  onMouseEnter,
  onMouseLeave,
  variant = 'default',
}) => {
  const navLinkClasses = `${styles.navLink} ${variant === 'glass' ? styles.glass : ''}`;
  
  if (hasDropdown) {
    return (
      <div
        className={`${styles.navLinkWrapper} ${variant === 'glass' ? styles.glass : ''}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Link to={href} className={navLinkClasses}>
          {title}
        </Link>
        <span className={styles.dropdownArrow}>▼</span>
      </div>
    );
  }

  return (
    <Link to={href} className={navLinkClasses}>
      {title}
    </Link>
  );
};

