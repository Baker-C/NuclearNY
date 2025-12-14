import React from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { useGradient } from '@/utils/createGradient';
import styles from './TextWithGradient.module.css';

interface TextWithGradientProps {
  /** The text content to display with gradient */
  text: string;
  /** Optional additional className */
  className?: string;
}

export const TextWithGradient: React.FC<TextWithGradientProps> = ({
  text,
  className = '',
}) => {
  const { theme } = useAppTheme();
  const gradient = useGradient({
    colors: [theme.colors.primary, theme.colors.secondary],
  });

  return (
    <span
      className={`${styles.textWithGradient} ${className}`}
      style={{ background: gradient }}
    >
      {text}
    </span>
  );
};

