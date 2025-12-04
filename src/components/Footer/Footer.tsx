import React, { useMemo } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);

  return (
    <footer className={styles.footer} style={themeStyles}>
      <div className={styles.container}>
        <p className={styles.text}>
          © {new Date().getFullYear()} NuclearNY. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

