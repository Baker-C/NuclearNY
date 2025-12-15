import React, { useMemo } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { PageHeader } from '@/components/PageHeader';
import styles from './AboutScreen.module.css';

export const AboutScreen: React.FC = () => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);

  return (
    <div className={styles.container} style={themeStyles}>
      <PageHeader title="About Nuclear New York" />
      <div className={styles.content}>
        <p className={styles.disclaimer}>
          Nuclear New York is an independent, non-partisan advocacy organization working towards a prosperous decarbonized future and nature conservation. We conduct rigorous research, education, policy advocacy, and non-intrusive activism. Nuclear New York is a 501(c)3 nonprofit organization.
        </p>
        <p className={styles.description}>
          Our mission is to promote understanding of nuclear energy as a clean, safe, and reliable source of power that can help meet our energy needs while reducing carbon emissions and supporting economic growth.
        </p>
      </div>
    </div>
  );
};

