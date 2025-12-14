import React, { useMemo } from 'react';
import { createStyles, useGradient, useAppTheme } from '@/utils';
import { RotatingText, Button } from '@/components';
import styles from './HomeHero.module.css';

export const HomeHero: React.FC = () => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);
  
  const backgroundGradient = useGradient({
    colors: [theme.colors.darkGreen, theme.colors.darkGreen],
  });

  const circularGradient1 = useGradient({
    colors: [
      theme.colors.darkGreen,
      theme.colors.darkGreen,
      theme.colors.green,
      theme.colors.green,
    ],
    percentages: [0.2, 0.45, 0.56, 1],
    type: 'radial',
    opacity: 0.8,
  });

  const circularGradient2 = useGradient({
    colors: [
      theme.colors.lightGreen,
      theme.colors.green,
      theme.colors.green,
    ],
    percentages: [0.5, 0.7, 1],
    opacity: 0.6,
  });

  return (
    <div
      className={styles.hero}
      style={{ ...themeStyles, background: backgroundGradient }}
    >
      <div className={styles.heroGradient1} style={{ background: circularGradient1 }}></div>
      <div className={styles.heroGradient2} style={{ background: circularGradient2 }}></div>
      <div className={styles.content}>
        <Title />
        <p className={styles.description}>
          The most reliable carbon-free energy with minimal footprint, powering communities and industries worldwide.
        </p>
        <Button
          text="Why Choose Nuclear"
          onClick={() => {}}
          accessory={{ side: 'right' }}
        />
      </div>
    </div>
  );
};


const Title: React.FC = () => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);
  
  return (
    <h2 className={styles.title} style={themeStyles}>
      {/* <span style={{ color: theme.colors.lightGreen }}>Nuclear</span>  */}
      <span style={{ color: theme.colors.white }}>{`Nuclear is `}</span>
      <span style={{ color: theme.colors.lightGreen }}>
        <RotatingText 
          strings={['clean.', 'safe.', 'cheap.', 'reliable.', 'efficient.', 'the future.']}
          interval={2000}
          sequentialDelay={50}
          rotationDelay={200}
          emphasisTimer={1500}
        />
      </span>
    </h2>
  );
};