import React, { useMemo } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { FacebookIcon, TwitterIcon, LinkedInIcon, MoreIcon } from '@/icons';
import styles from './PageHeader.module.css';

export interface PageHeaderProps {
  title: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  className,
}) => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);

  const containerClasses = [
    styles.container,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header
      className={containerClasses}
      style={themeStyles}
    >
      <div className={styles.headerContent}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.shareSection}>
          <span className={styles.shareLabel}>Share via:</span>
          <div className={styles.shareIcons}>
            <a href="#" className={styles.shareIcon} aria-label="Share on Facebook">
              <FacebookIcon className={styles.icon} />
            </a>
            <a href="#" className={styles.shareIcon} aria-label="Share on Twitter">
              <TwitterIcon className={styles.icon} />
            </a>
            <a href="#" className={styles.shareIcon} aria-label="Share on LinkedIn">
              <LinkedInIcon className={styles.icon} />
            </a>
            <a href="#" className={styles.shareIcon} aria-label="More sharing options">
              <MoreIcon className={styles.icon} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

