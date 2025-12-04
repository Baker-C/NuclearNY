import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from './NavLink';
import styles from './Dropdown.module.css';

type ColumnData = [string, ...Array<{ title: string; href: string }>];

interface DropdownProps {
  title: string;
  links: ColumnData;
  extraColumn1?: ColumnData;
  extraColumn2?: ColumnData;
  extraColumn3?: ColumnData;
}

export const Dropdown: React.FC<DropdownProps> = ({
  title,
  links,
  extraColumn1,
  extraColumn2,
  extraColumn3,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 762);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Extract column title and links from main column
  const mainColumnTitle = links[0];
  const mainLinks = links.slice(1) as Array<{ title: string; href: string }>;
  
  const hasMultipleLinks =
    mainLinks.length > 1 ||
    extraColumn1 ||
    extraColumn2 ||
    extraColumn3;

  // If no links, still render the title as a link (fallback)
  if (mainLinks.length === 0 && !extraColumn1 && !extraColumn2 && !extraColumn3) {
    return <NavLink title={title} href="#" />;
  }

  if (!hasMultipleLinks && mainLinks.length === 1) {
    // Single link - render as regular link without dropdown
    return <NavLink title={title} href={mainLinks[0].href} />;
  }

  const hasExtraColumns = extraColumn1 || extraColumn2 || extraColumn3;

  const handleToggle = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={styles.dropdown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={handleToggle}>
        <NavLink title={title} href={mainLinks[0]?.href || '#'} hasDropdown={true} />
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dropdownColumns}>
            {/* First column - main links */}
            <div className={styles.dropdownColumn}>
              {hasExtraColumns && (
                <div className={styles.columnTitle}>{mainColumnTitle}</div>
              )}
              {mainLinks.map((link, index) => (
                <Link key={index} to={link.href} className={styles.dropdownLink}>
                  {link.title}
                </Link>
              ))}
            </div>

            {/* Extra columns */}
            {hasExtraColumns && (
              <>
                {extraColumn1 && (
                  <div className={styles.dropdownColumn}>
                    <div className={styles.columnTitle}>{extraColumn1[0]}</div>
                    {(extraColumn1.slice(1) as Array<{ title: string; href: string }>).map((link, index) => (
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
                {extraColumn2 && (
                  <div className={styles.dropdownColumn}>
                    <div className={styles.columnTitle}>{extraColumn2[0]}</div>
                    {(extraColumn2.slice(1) as Array<{ title: string; href: string }>).map((link, index) => (
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
                {extraColumn3 && (
                  <div className={styles.dropdownColumn}>
                    <div className={styles.columnTitle}>{extraColumn3[0]}</div>
                    {(extraColumn3.slice(1) as Array<{ title: string; href: string }>).map((link, index) => (
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

