import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { Button } from '@/components/Button';
import styles from './NotFoundScreen.module.css';

export const NotFoundScreen: React.FC = () => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);
  const navigate = useNavigate();

  return (
    <div className={styles.container} style={themeStyles}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Page not found</p>
      <Button
        text="Go Home"
        onClick={() => navigate('/')}
        type="error"
      />
    </div>
  );
};

