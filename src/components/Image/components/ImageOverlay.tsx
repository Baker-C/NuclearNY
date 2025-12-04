import React, { useEffect, useRef, useState } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import styles from './ImageOverlay.module.css';

interface ImageOverlayProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  initialWidth: number | string;
  initialHeight: number | string;
}

export const ImageOverlay: React.FC<ImageOverlayProps> = ({
  src,
  alt,
  isOpen,
  onClose,
  initialWidth,
  initialHeight,
}) => {
  const { theme } = useAppTheme();
  const themeStyles = createStyles(theme);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const img = new window.Image();
      img.onload = () => {
        setImageDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
      img.src = src;
      // Reset loaded state when opening
      setImageLoaded(false);
    } else {
      setImageLoaded(false);
      setImageDimensions(null);
    }
  }, [isOpen, src]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const calculateFinalSize = () => {
    if (!imageDimensions) {
      return { width: '90vw', height: '90vh' };
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const aspectRatio = imageDimensions.width / imageDimensions.height;
    const viewportAspectRatio = viewportWidth / viewportHeight;

    if (aspectRatio > viewportAspectRatio) {
      // Image is wider - use full width
      return {
        width: '90vw',
        height: `${(90 * viewportWidth) / aspectRatio / viewportHeight}vh`,
      };
    } else {
      // Image is taller - use full height
      return {
        width: `${(90 * viewportHeight * aspectRatio) / viewportWidth}vw`,
        height: '90vh',
      };
    }
  };

  const finalSize = calculateFinalSize();

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={onClose}
      style={themeStyles}
    >
      <div
        className={`${styles.imageContainer} ${imageLoaded ? styles.zoomed : styles.initial}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: imageLoaded ? finalSize.width : initialWidth,
          height: imageLoaded ? finalSize.height : initialHeight,
        }}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={styles.overlayImage}
          onLoad={() => {
            // Small delay to ensure initial size is rendered before zoom
            setTimeout(() => {
              setImageLoaded(true);
            }, 50);
          }}
        />
      </div>
    </div>
  );
};

