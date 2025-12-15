import React, { useMemo } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { ArticleList } from '@/components/ArticleList';
import { mockArticles } from '@/components/ArticleList/ArticleList.mock';
import styles from './News.module.css';

export interface NewsProps {
  className?: string;
}

export const News: React.FC<NewsProps> = ({
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
    <section
      className={containerClasses}
      style={themeStyles}
    >
      <h2 className={styles.heading}>Explore the News & Latest</h2>
      <ArticleList articles={mockArticles} />
    </section>
  );
};

