import React, { useMemo, ReactNode, CSSProperties } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import styles from './ContentSection.module.css';

export interface ContentSectionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  children,
  className,
  style,
}) => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);

  const containerClasses = [
    styles.container,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const mergedStyles = useMemo(() => ({
    ...themeStyles,
    ...style,
  }), [themeStyles, style]);

  return (
    <section
      className={containerClasses}
      style={mergedStyles}
    >
      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
};

