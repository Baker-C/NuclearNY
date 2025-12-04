import React, { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import styles from './CoinCarousel.module.css';

export interface CoinCarouselProps {
  // ============ VELOCITY & PATH CONFIG ============
  /** Velocity during fast section (progress/sec) */
  fastVelocity?: number;
  /** Velocity during slow section (progress/sec) */
  slowVelocity?: number;
  /** Portion of circle for fast section (0-1) */
  fastPathPercent?: number;
  /** Portion of circle for slow section (0-1) */
  slowPathPercent?: number;
  // ================================================
  /** Whether animation autoplays */
  autoplay?: boolean;
  /** Ellipse width in pixels */
  ellipseWidth?: number;
  /** Ellipse height in pixels */
  ellipseHeight?: number;
  /** Tilt angle of the ellipse in degrees (tilts around X-axis) */
  tiltAngle?: number;
  /** Horizontal offset in pixels */
  offsetX?: number;
  /** Vertical offset in pixels */
  offsetY?: number;
  /** CSS perspective value for 3D effect */
  perspective?: number;
  /** Coin size in pixels */
  coinSize?: number;
  /** Custom coin content renderer */
  renderCoin?: () => React.ReactNode;
}

const DEFAULT_PROPS: Required<Omit<CoinCarouselProps, 'renderCoin'>> = {
  // Velocity & path config
  fastVelocity: 0.5,
  slowVelocity: 0.1,
  fastPathPercent: 0.1,
  slowPathPercent: 0.6,
  // Other props
  autoplay: true,
  ellipseWidth: 200,
  ellipseHeight: 100,
  tiltAngle: 60,
  offsetX: 0,
  offsetY: 0,
  perspective: 800,
  coinSize: 120,
};

export const CoinCarousel: React.FC<CoinCarouselProps> = ({
  // Velocity & path config
  fastVelocity = DEFAULT_PROPS.fastVelocity,
  slowVelocity = DEFAULT_PROPS.slowVelocity,
  fastPathPercent = DEFAULT_PROPS.fastPathPercent,
  slowPathPercent = DEFAULT_PROPS.slowPathPercent,
  // Other props
  autoplay = DEFAULT_PROPS.autoplay,
  ellipseWidth = DEFAULT_PROPS.ellipseWidth,
  ellipseHeight = DEFAULT_PROPS.ellipseHeight,
  tiltAngle = DEFAULT_PROPS.tiltAngle,
  offsetX = DEFAULT_PROPS.offsetX,
  offsetY = DEFAULT_PROPS.offsetY,
  perspective = DEFAULT_PROPS.perspective,
  coinSize = DEFAULT_PROPS.coinSize,
  renderCoin,
}) => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);
  const containerRef = useRef<HTMLDivElement>(null);
  const coinRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ progress: 0, velocity: fastVelocity });
  const tickerCallbackRef = useRef<(() => void) | null>(null);

  // Calculate ellipse semi-axes
  const radiusX = ellipseWidth / 2;
  const radiusY = ellipseHeight / 2;
  
  // Convert tilt angle to radians
  const tiltRad = (tiltAngle * Math.PI) / 180;

  // Calculate 3D position on tilted ellipse
  const getPosition = (angle: number) => {
    // Base ellipse position (in XY plane)
    const baseX = Math.cos(angle) * radiusX;
    const baseY = Math.sin(angle) * radiusY;
    
    // Apply tilt rotation around X-axis
    // This transforms Y -> Y*cos(tilt) and adds Z component
    const x = baseX + offsetX;
    const y = baseY * Math.cos(tiltRad) + offsetY;
    const z = baseY * Math.sin(tiltRad);
    
    // Scale based on z-depth for enhanced 3D effect
    const scale = 1 + (z / (radiusY * 2)) * 0.3;
    
    return { x, y, z, scale };
  };

  // Initialize and start tilted elliptical animation with velocity-based approach
  useEffect(() => {
    if (!containerRef.current || !coinRef.current || !autoplay) return;

    // Clear any existing animation
    if (tickerCallbackRef.current) {
      gsap.ticker.remove(tickerCallbackRef.current);
    }

    const state = stateRef.current;
    state.progress = 0;
    state.velocity = fastVelocity;

    // Calculate path boundaries for each segment
    // Segment 1: fast (0 to fastPathPercent)
    // Segment 2: transition fast→slow
    // Segment 3: slow
    // Segment 4: transition slow→fast
    const transitionPathPercent = (1 - fastPathPercent - slowPathPercent) / 2;
    
    // Offset so slow section is centered at front of ellipse (where z is max)
    const startOffset = transitionPathPercent / 2;
    
    const seg1End = fastPathPercent;
    const seg2End = seg1End + transitionPathPercent;
    const seg3End = seg2End + slowPathPercent;
    // seg4 goes from seg3End to 1.0

    // Get velocity based on position (progress) on the ellipse
    const getVelocityAtProgress = (p: number): number => {
      if (p < seg1End) {
        // Segment 1: constant fast
        return fastVelocity;
      } else if (p < seg2End) {
        // Segment 2: transition fast → slow (linear interpolation)
        const t = (p - seg1End) / transitionPathPercent;
        return fastVelocity + (slowVelocity - fastVelocity) * t;
      } else if (p < seg3End) {
        // Segment 3: constant slow
        return slowVelocity;
      } else {
        // Segment 4: transition slow → fast (linear interpolation)
        const t = (p - seg3End) / transitionPathPercent;
        return slowVelocity + (fastVelocity - slowVelocity) * t;
      }
    };

    // Ticker callback: get velocity based on position, then integrate
    const updateProgress = () => {
      const deltaTime = gsap.ticker.deltaRatio() / 60; // Convert to seconds
      
      // Get velocity based on current position
      state.velocity = getVelocityAtProgress(state.progress);
      
      // Integrate velocity into progress
      state.progress += state.velocity * deltaTime;
      
      // Wrap progress to stay in 0-1 range
      if (state.progress >= 1) {
        state.progress -= 1;
      }

      // Update coin position (add startOffset to rotate slow section to front)
      const angle = (state.progress + startOffset) * Math.PI * 2;
      const pos = getPosition(angle);
      
      gsap.set(coinRef.current, {
        x: pos.x,
        y: pos.y,
        z: pos.z,
        scale: pos.scale,
      });
    };

    tickerCallbackRef.current = updateProgress;
    gsap.ticker.add(updateProgress);

    // Cleanup
    return () => {
      if (tickerCallbackRef.current) {
        gsap.ticker.remove(tickerCallbackRef.current);
        tickerCallbackRef.current = null;
      }
    };
  }, [autoplay, radiusX, radiusY, tiltRad, offsetX, offsetY, fastVelocity, slowVelocity, fastPathPercent, slowPathPercent]);

  // Set initial position
  useEffect(() => {
    if (!coinRef.current) return;
    const transitionPathPercent = (1 - fastPathPercent - slowPathPercent) / 2;
    const startOffset = -(transitionPathPercent / 2);
    const angle = (stateRef.current.progress + startOffset) * Math.PI * 2;
    const pos = getPosition(angle);
    gsap.set(coinRef.current, {
      x: pos.x,
      y: pos.y,
      z: pos.z,
      scale: pos.scale,
    });
  }, [radiusX, radiusY, tiltRad, offsetX, offsetY, fastPathPercent, slowPathPercent]);

  const containerStyle = useMemo(
    () => ({
      ...themeStyles,
      perspective: `${perspective}px`,
    }),
    [themeStyles, perspective]
  );

  const coinStyle = useMemo(
    () => ({
      width: `${coinSize}px`,
      height: `${coinSize}px`,
    }),
    [coinSize]
  );

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={containerStyle}
    >
      <div className={styles.carousel}>
        <div
          ref={coinRef}
          className={styles.coin}
          style={coinStyle}
        >
          {renderCoin ? (
            renderCoin()
          ) : (
            <div className={styles.coinDefault}>
              <span className={styles.coinLabel}>$</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

