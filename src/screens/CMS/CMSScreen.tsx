import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { copyService } from '@/services';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { NotFoundScreen } from '@/screens/NotFound';
import styles from './CMSScreen.module.css';

export const CMSScreen: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);

  const pageData = copyService.getPageContent({ pageId: pageId || '' });

  if (!pageData) {
    return <NotFoundScreen />;
  }

  return (
    <div className={styles.container} style={themeStyles}>
      <h1 className={styles.title}>{pageData.title || pageId}</h1>
      <button className={styles.button} onClick={() => navigate('/')}>
        Go Home
      </button>
    </div>
  );
};

