import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import styles from './ServerErrorScreen.module.css';

export const ServerErrorScreen: React.FC = () => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);
  const navigate = useNavigate();

  return (
    <div className={styles.container} style={themeStyles}>
      <h1 className={styles.title}>500</h1>
      <p className={styles.text}>Internal server error</p>
      <button className={styles.button} onClick={() => navigate('/')}>
        Go Home
      </button>
    </div>
  );
};

