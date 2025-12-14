import React, { useState, useEffect, useMemo, useRef } from 'react';
import styles from './RotatingText.module.css';

interface RotatingTextProps {
  /** Array of strings to rotate through */
  strings: string[];
  /** ClassName to apply to each letter span. If provided, overrides default styles completely */
  className?: string;
  /** Rotation interval in milliseconds (default: 3000) */
  interval?: number;
  /** Rotation delay in milliseconds (default: 0) */
  rotationDelay?: number;
  /** Emphasis timer in milliseconds (default: 0) - extra delay for last word only */
  emphasisTimer?: number;
  /** Pause delay in milliseconds (default: 1750) */
  pauseDelay?: number;
  /** Sequential delay in milliseconds (default: 100) */
  sequentialDelay?: number;
  /** Whether to center the text (default: false) */
  centered?: boolean;
}

export const RotatingText: React.FC<RotatingTextProps> = ({
  strings,
  className = '',
  interval = 1750,
  rotationDelay = 0,
  emphasisTimer = 0,
  sequentialDelay = 100,
  centered = false,
}) => {
  // Pre-render all strings as letter arrays
  const letterArrays = useMemo(() => {
    return strings.map((string) => string.split(''));
  }, [strings]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (strings.length === 0) return;

    const scheduleNext = (index: number) => {
      // Check if we're on the last word - if so, add emphasisTimer delay
      const isLastWord = index === strings.length - 1;
      const delay = isLastWord ? interval + emphasisTimer : interval;
      
      timeoutRef.current = setTimeout(() => {
        const nextIndex = (index + 1) % strings.length;
        // Set outgoing index to the current one before switching
        setOutgoingIndex(index);
        // Clear outgoing after 0.5 seconds
        setTimeout(() => {
          setOutgoingIndex(null);
        }, 500);
        // Update to next index
        setCurrentIndex(nextIndex);
        // Schedule the next transition
        scheduleNext(nextIndex);
      }, delay);
    };

    // Start the rotation after initial interval
    timeoutRef.current = setTimeout(() => {
      scheduleNext(0);
    }, interval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [strings.length, interval, emphasisTimer]);

  if (strings.length === 0) {
    return null;
  }

  const currentLetters = letterArrays[currentIndex];
  const outgoingLetters = outgoingIndex !== null ? letterArrays[outgoingIndex] : null;

  // Get largest string from strings to measure width of the container
  const measurementString = strings.reduce((longest, current) => current.length > longest.length ? current : longest, '');

  // If className is provided, use it exclusively. Otherwise, use default module class
  const containerClassName = className || styles.container;
  const letterContainerClassName = `${styles.letterContainer}
    ${centered ? styles.centered : ''}`;

  return (
    <span className={containerClassName}>
      {/* Render outgoing word with translateOut animation */}
      {outgoingLetters && (
        <span className={letterContainerClassName}>
          {outgoingLetters.map((letter, letterIndex) => (
            <span
              key={`outgoing-${outgoingIndex}-${letterIndex}`}
              className={`${styles.letter} ${styles.outgoing}`}
              style={{ 
                '--sequentialDelay': `${letterIndex * sequentialDelay}ms`,
                '--pauseDelay': `${interval}ms`
              } as React.CSSProperties}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </span>
      )}
      {/* Render current word with translateIn animation */}
      <span className={letterContainerClassName}>    
        {currentLetters.map((letter, letterIndex) => (
            <span
            key={`current-${currentIndex}-${letterIndex}`}
            className={styles.letter}
            style={{ 
                '--sequentialDelay': `${letterIndex * sequentialDelay}ms`,
                '--pauseDelay': `${interval}ms`,
                '--rotationDelay': `${rotationDelay}ms`
            } as React.CSSProperties}
            >
            {letter === ' ' ? '\u00A0' : letter}
            </span>
        ))}
      </span>
      {/* Render invisible text to measure the width of the current word */}
      <span className={styles.sizingText}>
        {measurementString}
      </span>
    </span>
  );
};

