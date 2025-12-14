import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { copyService } from '@/services';
import { ComponentList, BaseComponent } from '@/types/copy';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { useNavBar } from '@/providers/NavBarProvider';
import { Dropdown, HamburgerMenu, Sidebar } from './components';
import styles from './NavBar.module.css';

const extractLinksFromComponentList = (
  componentList: ComponentList
): Array<{ title: string; href: string }> => {
  const links: Array<{ title: string; href: string }> = [];
  const items = componentList.value || [];

  for (const item of items) {
    if (item.component.type === 'ComponentList') {
      const linkItem = item.component as ComponentList;
      const linkComponents = linkItem.components || [];
      let title = '';
      let href = '';

      for (const linkCompWrapper of linkComponents) {
        const linkComp = linkCompWrapper.component;
        
        if (linkComp.type === 'Text') {
          title = (linkComp as BaseComponent).value as string;
        } else if (linkComp.type === 'URL') {
          const urlValue = (linkComp as BaseComponent).value as {
            href?: string;
            text?: string;
          };
          href = urlValue?.href || '#';
        }
      }

      if (title && href) {
        links.push({ title, href });
      }
    }
  }

  return links;
};

export const NavBar: React.FC = () => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);
  const { variant, hidden, setHidden } = useNavBar();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigationData = copyService.getPage({ pageId: 'navigation' });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 762);
      if (window.innerWidth > 762) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Scroll detection for auto-hiding navbar
  useEffect(() => {
    let lastScrollY = window.scrollY || document.documentElement.scrollTop;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY || document.documentElement.scrollTop;
          const scrollDifference = currentScrollY - lastScrollY;
          
          // Always show navbar at the top (within 50px)
          if (currentScrollY <= 50) {
            setHidden(false);
          } 
          // Only process scroll direction if we've scrolled past the threshold
          else if (Math.abs(scrollDifference) > 5) {
            if (scrollDifference > 0) {
              // Scrolling down - hide navbar
              setHidden(true);
            } else if (scrollDifference < 0) {
              // Scrolling up - show navbar
              setHidden(false);
            }
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Listen to scroll on both window and document for better compatibility
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [setHidden]);

  if (!navigationData) {
    return null;
  }

  // Use the nuclearny-logo-nobg.png as the logo
  const logoImage = {
    src: '/nuclearny-logo-nobg.png',
    alt: 'NuclearNY Logo',
  };

  // Extract navigation items (ComponentLists for dropdowns and URLs for simple links)
  const navItems: React.ReactNode[] = [];

  for (const comp of navigationData.components) {
    // Skip Heading and Image (already handled)
    if (
      comp.component.type === 'Heading' ||
      comp.component.type === 'Image'
    ) {
      continue;
    }

    // Handle dropdown menus (ComponentList with rigid=true)
    if (
      comp.component.type === 'ComponentList' &&
      (comp.component as ComponentList).rigid === true
    ) {
      const dropdown = comp.component as ComponentList;
      const dropdownValue = dropdown.value || [];
      let dropdownTitle = '';
      type ColumnData = [string, ...Array<{ title: string; href: string }>];
      let links: ColumnData = ['', { title: '', href: '#' }];

      // Extract title (first Text component) and links (ComponentList)
      // Also extract up to 3 additional ComponentLists for extra columns
      // Each column should be [columnTitle: string, ...links]
      const extraColumns: ColumnData[] = [];
      let columnIndex = 0;

      for (const item of dropdownValue) {
        if (item.component.type === 'Text') {
          dropdownTitle = (item.component as BaseComponent).value as string;
        } else if (item.component.type === 'ComponentList') {
          // Extract links from the nested ComponentList (rigid=false)
          const nestedList = item.component as ComponentList;
          const extractedLinks = extractLinksFromComponentList(nestedList);

          // Extract column title from first Text component in the ComponentList's value
          // or use a default title
          let columnTitle = '';
          const nestedValue = nestedList.value || [];
          for (const nestedItem of nestedValue) {
            if (nestedItem.component.type === 'Text') {
              columnTitle = (nestedItem.component as BaseComponent).value as string;
              break;
            }
          }
          
          // If no title found, use a default
          if (!columnTitle) {
            columnTitle = `Column ${columnIndex + 1}`;
          }

          // Structure as [columnTitle, ...links]
          const columnData: ColumnData = [columnTitle, ...extractedLinks];

          if (columnIndex === 0) {
            // First ComponentList is the main links column
            links = columnData;
          } else if (columnIndex <= 3) {
            // Additional ComponentLists become extra columns (up to 3)
            extraColumns.push(columnData);
          }
          columnIndex++;
        }
      }

      if (dropdownTitle) {
        navItems.push(
          <Dropdown
            key={navItems.length}
            title={dropdownTitle}
            links={links}
            extraColumn1={extraColumns[0]}
            extraColumn2={extraColumns[1]}
            extraColumn3={extraColumns[2]}
            variant={variant}
          />
        );
      }
    }
    // Handle simple URL links
    else if (comp.component.type === 'URL') {
      const urlValue = (comp.component as BaseComponent).value as {
        href?: string;
        text?: string;
      };
      const href = urlValue?.href || '#';
      const text = urlValue?.text || 'Link';

      navItems.push(
        <Link key={navItems.length} to={href} className={styles.navLink}>
          {text}
        </Link>
      );
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Combine base styles with variant-specific class and hidden state
  const navBarClasses = `${styles.navBar} ${variant === 'glass' ? styles.glass : ''} ${hidden ? styles.hidden : ''}`;

  return (
    <>
      <nav className={navBarClasses} style={themeStyles}>
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <Link to="/" className={styles.logo} onClick={closeSidebar}>
              {logoImage && (
                <img
                  src={logoImage.src}
                  alt={logoImage.alt || 'Logo'}
                  className={styles.logoImage}
                />
              )}
              <span className={styles.logoText}>NuclearNY</span>
            </Link>
            <HamburgerMenu isOpen={isSidebarOpen} onClick={toggleSidebar} />
          </div>
          {!isMobile && <div className={styles.nav}>{navItems}</div>}
        </div>
      </nav>
      {isMobile && (
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} variant={variant}>
          {navItems}
        </Sidebar>
      )}
    </>
  );
};

