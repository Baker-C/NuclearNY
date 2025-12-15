import React, { useMemo } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { ArticlePreview, ArticlePreviewProps } from '@/components/ArticlePreview';
import styles from './ArticleList.module.css';

export interface ArticleListProps {
  articles: ArticlePreviewProps[];
  className?: string;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
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
    <div
      className={containerClasses}
      style={themeStyles}
    >
      <div className={styles.separator} />
      {articles.map((article, index) => (
        <React.Fragment key={`${article.title}-${article.date}-${index}`}>
          <ArticlePreview {...article} />
          {index < articles.length - 1 && <div className={styles.separator} />}
        </React.Fragment>
      ))}
      <div className={styles.separator} />
    </div>
  );
};

