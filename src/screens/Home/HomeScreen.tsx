import React, { useMemo } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import styles from './HomeScreen.module.css';

export const HomeScreen: React.FC = () => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);

  return (
    <div className={styles.container} style={themeStyles}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome to NuclearNY</h1>
        </div>
        <div className={styles.components}>
          <section>
            <h2 className={styles.heading}>About</h2>

          </section>
        </div>
      </div>
    </div>
  );
};
