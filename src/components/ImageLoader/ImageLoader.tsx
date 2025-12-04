import React, { useState, useEffect, ReactNode } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import styles from './ImageLoader.module.css';

interface ImageLoaderProps {
  width: number | string;
  height: number | string;
  className?: string;
  style?: React.CSSProperties;
  loadingAnimation?: 'grey' | 'blue';
  children: ReactNode;
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({
  width,
  height,
  className,
  style,
  loadingAnimation = 'grey',
  children,
}) => {
  const { theme } = useAppTheme();
  const themeStyles = createStyles(theme);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const containerStyle = {
    ...themeStyles,
    ...(height && { height }),
    ...(width && { width }),
    ...style,
  };

  if (isLoading) {
    const animationClass =
      loadingAnimation === 'blue'
        ? styles.loadingAnimationBlue
        : styles.loadingAnimationGrey;

    return (
      <div
        className={`${styles.loadingContainer} ${className || ''}`}
        style={containerStyle}
      >
        <div className={`${styles.loadingAnimation} ${animationClass}`} />
      </div>
    );
  }

  return <>{children}</>;
};

