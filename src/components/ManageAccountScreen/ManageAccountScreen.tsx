import React, { useMemo } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { userService } from '@/services';
import styles from './ManageAccountScreen.module.css';

export const ManageAccountScreen: React.FC = () => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);

  // Example service usage
  const handleGetUser = async () => {
    try {
      const response = await userService.getUserById({ id: '123' });
      console.log('User data:', response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <div className={styles.container} style={themeStyles}>
      <h1 className={styles.title}>Manage Account</h1>
      <p className={styles.text}>Example component showing theme usage</p>
      <button className={styles.button} onClick={handleGetUser}>
        Get User
      </button>
    </div>
  );
};

