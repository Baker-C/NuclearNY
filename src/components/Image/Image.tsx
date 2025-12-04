import React, { useMemo, useState } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { ImageOverlay } from './components';
import { ImageLoader } from '@/components/ImageLoader';
import styles from './Image.module.css';

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  width: number | string;
  height: number | string;
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  onClick?: () => void;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  className,
  onClick,
  objectFit,
  ...rest
}) => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const imageClasses = [
    styles.image,
    styles.clickable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleImageClick = () => {
    if (onClick) {
      onClick();
    } else {
      setIsOverlayOpen(true);
    }
  };

  return (
    <ImageLoader
      width={width}
      height={height}
      className={className}
      style={rest.style}
    >
      <>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          className={imageClasses}
          onClick={handleImageClick}
          style={{
            ...themeStyles,
            ...(objectFit && { objectFit }),
            ...(height && { height }),
            ...(width && { width }),
            ...rest.style,
          }}
          {...rest}
        />
        <ImageOverlay
          src={src}
          alt={alt}
          isOpen={isOverlayOpen}
          onClose={() => setIsOverlayOpen(false)}
          initialWidth={width}
          initialHeight={height}
        />
      </>
    </ImageLoader>
  );
};

