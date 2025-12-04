import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from '../components/NavLink';
import styles from './Dropdown.module.css';

interface DropdownProps {
  title: string;
  links: Array<{ title: string; href: string }>;
}

export const Dropdown: React.FC<DropdownProps> = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasMultipleLinks = links.length > 1;

  // If no links, still render the title as a link (fallback)
  if (links.length === 0) {
    return <NavLink title={title} href="#" />;
  }

  if (!hasMultipleLinks && links.length === 1) {
    // Single link - render as regular link without dropdown
    return <NavLink title={title} href={links[0].href} />;
  }

  return (
    <div
      className={styles.dropdown}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <NavLink
        title={title}
        href={links[0].href}
        hasDropdown={true}
      />
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className={styles.dropdownLink}
            >
              {link.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

