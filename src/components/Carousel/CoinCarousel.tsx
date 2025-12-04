import React, { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import styles from './CoinCarousel.module.css';

export interface CoinCarouselProps {
  /** Number of coins in the carousel */
  coinCount?: number;
  /** Duration of one complete loop in seconds */
  loopDuration?: number;
  /** Duration coins stay in showcase position in seconds */
  showcaseDuration?: number;
  /** Whether animation autoplays */
  autoplay?: boolean;
  /** CSS perspective value */
  perspective?: number;
  /** GSAP easing curve */
  easing?: string;
  /** Ellipse width in pixels */
  ellipseWidth?: number;
  /** Ellipse height in pixels */
  ellipseHeight?: number;
  /** Coin size in pixels */
  coinSize?: number;
  /** Custom coin content renderer */
  renderCoin?: (index: number) => React.ReactNode;
}

interface CoinConfig {
  index: number;
  element: HTMLDivElement;
}

const DEFAULT_PROPS: Required<Omit<CoinCarouselProps, 'renderCoin'>> = {
  coinCount: 5,
  loopDuration: 10,
  showcaseDuration: 1.5,
  autoplay: true,
  perspective: 1000,
  easing: 'power1.inOut',
  ellipseWidth: 600,
  ellipseHeight: 300,
  coinSize: 120,
};

export const CoinCarousel: React.FC<CoinCarouselProps> = ({
  coinCount = DEFAULT_PROPS.coinCount,
  loopDuration = DEFAULT_PROPS.loopDuration,
  showcaseDuration = DEFAULT_PROPS.showcaseDuration,
  autoplay = DEFAULT_PROPS.autoplay,
  perspective = DEFAULT_PROPS.perspective,
  easing = DEFAULT_PROPS.easing,
  ellipseWidth = DEFAULT_PROPS.ellipseWidth,
  ellipseHeight = DEFAULT_PROPS.ellipseHeight,
  coinSize = DEFAULT_PROPS.coinSize,
  renderCoin,
}) => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);
  const containerRef = useRef<HTMLDivElement>(null);
  const coinRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Calculate ellipse parameters
  const ellipseConfig = useMemo(() => {
    const a = ellipseWidth / 2; // Semi-major axis
    const b = ellipseHeight / 2; // Semi-minor axis
    return { a, b };
  }, [ellipseWidth, ellipseHeight]);

  // Calculate position on ellipse at given angle
  // Angle 0 = right side, π/2 = bottom, π = left side, 3π/2 = top
  const getEllipsePosition = (angle: number) => {
    const { a, b } = ellipseConfig;
    const x = a * Math.cos(angle);
    const y = b * Math.sin(angle);
    // Z depth: coins at front (angle = 0) have highest z, back (angle = π) have lowest z
    // Use cosine to map angle to z depth smoothly
    const z = b * (1 - Math.cos(angle)) - b; // Range from -b (back) to b (front)
    return { x, y, z };
  };

  // Calculate scale and z position with showcase enhancement at front
  const getCarouselTransform = useMemo(() => {
    return (angle: number, progress: number) => {
      const basePos = getEllipsePosition(angle);
      
      // Normalize angle to 0-2π range
      const normalizedAngle = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      
      // Distance from front (angle = 0 or 2π)
      const distanceFromFront = Math.min(normalizedAngle, Math.PI * 2 - normalizedAngle);
      
      // Showcase zone: within showcaseDuration portion of the loop (centered at front)
      // Convert time duration to angle span
      const showcaseZoneSize = (showcaseDuration / loopDuration) * Math.PI;
      const isInShowcaseZone = distanceFromFront < showcaseZoneSize;
      
      // Base scale based on z position (closer = larger)
      const normalizedZ = (basePos.z + ellipseConfig.b) / (2 * ellipseConfig.b);
      let scale = 0.4 + normalizedZ * 0.6;
      let z = basePos.z;
      
      // Enhance showcase: bring forward and scale up when in showcase zone
      if (isInShowcaseZone) {
        const showcaseProgress = 1 - (distanceFromFront / showcaseZoneSize);
        // Smooth ease-in-out curve for showcase enhancement
        const easeProgress = showcaseProgress < 0.5
          ? 2 * showcaseProgress * showcaseProgress
          : 1 - Math.pow(-2 * showcaseProgress + 2, 2) / 2;
        
        // Bring forward and scale up during showcase
        z = basePos.z + ellipseConfig.b * 0.6 * easeProgress;
        scale = scale + 0.6 * easeProgress;
      }
      
      return {
        x: basePos.x,
        y: basePos.y,
        z,
        scale,
      };
    };
  }, [ellipseConfig, showcaseDuration, loopDuration]);

  // Create smooth continuous carousel animation for a single coin
  const createCoinAnimation = useMemo(() => {
    return (coin: CoinConfig, startAngle: number) => {
      const totalAngle = Math.PI * 2; // Full circle
      
      // Use keyframes for smooth carousel motion around the ellipse
      // Fewer keyframes with GSAP's smooth interpolation
      const keyframeCount = 40; // Balance between smoothness and performance
      const segmentDuration = loopDuration / keyframeCount;
      
      const coinTimeline = gsap.timeline();
      
      // Animate through keyframes for smooth continuous carousel motion
      for (let i = 0; i <= keyframeCount; i++) {
        const progress = i / keyframeCount;
        const angle = startAngle + totalAngle * progress;
        const transform = getCarouselTransform(angle, progress);
        
        if (i === 0) {
          // Set initial position
          gsap.set(coin.element, {
            x: transform.x,
            y: transform.y,
            z: transform.z,
            scale: transform.scale,
          });
        } else {
          // Animate to this keyframe
          coinTimeline.to(coin.element, {
            x: transform.x,
            y: transform.y,
            z: transform.z,
            scale: transform.scale,
            duration: segmentDuration,
            ease: easing,
          }, coinTimeline.duration());
        }
      }
      
      return coinTimeline;
    };
  }, [getCarouselTransform, loopDuration, easing]);

  // Initialize and start animation
  useEffect(() => {
    if (!containerRef.current || !autoplay) return;

    // Clear any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Filter out null refs and create coin configs
    const coins: CoinConfig[] = coinRefs.current
      .filter((ref): ref is HTMLDivElement => ref !== null)
      .map((element, index) => ({ index, element }));

    if (coins.length === 0) return;

    // Create master timeline
    const masterTimeline = gsap.timeline({
      repeat: -1,
      defaults: { ease: easing },
    });

    // Add each coin's animation with offset
    coins.forEach((coin, i) => {
      const startAngle = (i / coinCount) * Math.PI * 2;
      const coinTimeline = createCoinAnimation(coin, startAngle);
      // Offset each coin by its position in the cycle
      // This ensures coins are evenly spaced around the carousel
      const offset = (i / coinCount) * loopDuration;
      masterTimeline.add(coinTimeline, offset);
    });

    timelineRef.current = masterTimeline;

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [
    coinCount,
    loopDuration,
    showcaseDuration,
    autoplay,
    easing,
    ellipseWidth,
    ellipseHeight,
    createCoinAnimation,
  ]);

  // Set initial positions
  useEffect(() => {
    coinRefs.current.forEach((coinRef, i) => {
      if (!coinRef) return;
      const startAngle = (i / coinCount) * Math.PI * 2;
      const transform = getCarouselTransform(startAngle, 0);

      gsap.set(coinRef, {
        x: transform.x,
        y: transform.y,
        z: transform.z,
        scale: transform.scale,
      });
    });
  }, [coinCount, ellipseWidth, ellipseHeight, loopDuration, showcaseDuration, getCarouselTransform]);

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
        {Array.from({ length: coinCount }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              coinRefs.current[index] = el;
            }}
            className={styles.coin}
            style={coinStyle}
          >
            {renderCoin ? (
              renderCoin(index)
            ) : (
              <div className={styles.coinDefault}>
                <span className={styles.coinLabel}>{index + 1}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

