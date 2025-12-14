import React, { useMemo } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import styles from './ArticleMetadata.module.css';

export interface ArticleMetadataProps {
  category: string;
  readTime: string;
  date: string;
  className?: string;
}

export const ArticleMetadata: React.FC<ArticleMetadataProps> = ({
  category,
  readTime,
  date,
  className,
}) => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);

  const containerClasses = [
    styles.metadata,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClasses}
      style={themeStyles}
    >
      <span className={styles.category}>{category}</span>
      <span className={styles.separator}>•</span>
      <span className={styles.readTime}>{readTime}</span>
      <span className={styles.separator}>•</span>
      <span className={styles.date}>{date}</span>
    </div>
  );
};

