import React, { useMemo } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { Button, ContentSection } from '@/components';
import styles from './About.module.css';

export interface AboutProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onLearnMore?: () => void;
  className?: string;
}

export const About: React.FC<AboutProps> = ({
  title = 'Who Are We?',
  description = 'Nuclear New York is an independent and non-partisan organization devoted to supporting nuclear energy in New York and beyond. We conduct rigorous research, unbiased education, policy advocacy, and non-intrusive activism.',
  buttonText = 'Learn More',
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
    <ContentSection
      className={containerClasses}
      style={themeStyles}
    >
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <Button
        text={buttonText}
        accessory={{ side: 'right' }}
      />
    </ContentSection>
  );
};

