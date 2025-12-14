import React, { useEffect } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { NavBarVariant } from '@/providers/NavBarProvider';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  variant?: NavBarVariant;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  children,
  variant = 'default',
}) => {
  const { theme } = useAppTheme();
  const themeStyles = createStyles(theme);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={onClose}
          style={themeStyles}
          aria-hidden="true"
        />
      )}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : ''} ${variant === 'glass' ? styles.glass : ''}`}
        style={themeStyles}
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
      >
        <div className={styles.sidebarContent}>{children}</div>
      </aside>
    </>
  );
};

