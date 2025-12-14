import React, { useMemo } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { Image } from '@/components/Image';
import { ArticleMetadata } from './components';
import styles from './ArticlePreview.module.css';

export interface ArticlePreviewProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string | string[];
  category: string;
  readTime: string;
  date: string;
  className?: string;
  imageWidth?: number | string;
  imageHeight?: number | string;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  category,
  readTime,
  date,
  className,
  imageWidth = 200,
  imageHeight = 100,
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
    <article
      className={containerClasses}
      style={themeStyles}
    >
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {Array.isArray(description) ? (
          <ul className={styles.descriptionList}>
            {description.map((item, index) => (
              <li key={index} className={styles.descriptionItem}>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.description}>{description}</p>
        )}
        <ArticleMetadata
          category={category}
          readTime={readTime}
          date={date}
        />
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          objectFit="cover"
          className={styles.image}
          popup={false}
        />
      </div>
    </article>
  );
};

