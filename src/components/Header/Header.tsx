import React, { useMemo } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { NavBar } from '@/components/NavBar';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);

  return (
    <header className={styles.header} style={themeStyles}>
      <NavBar />
    </header>
  );
};

