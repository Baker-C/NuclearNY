export interface GradientOptions {
  /** Array of colors for the gradient. Single color returns solid color, multiple colors create evenly distributed gradient. */
  colors: string[];
  /** Optional array of cumulative stop positions (0-1) for each color. Must match colors array length and be in ascending order. First color starts at 0, each subsequent color ends at its percentage. */
  percentages?: number[];
  /** Optional opacity (0-1) for all colors, or array of opacities (0-1) for each color. Defaults to 1 (100% opacity). */
  opacity?: number | number[];
  /** Direction/angle for linear gradients (defaults to '135deg') */
  direction?: string | number;
  /** Gradient type (defaults to 'linear') */
  type?: 'linear' | 'radial';
  /** For radial gradients: shape and position (defaults to 'circle at center') */
  radialShape?: string;
}

/**
 * Creates a CSS gradient string with evenly distributed colors
 * 
 * @param options - Gradient configuration options
 * @returns CSS gradient string or solid color if only one color provided
 * 
 * @example
 * // Single color (solid, no gradient)
 * const gradient = useGradient({ colors: ['#0000FF'] });
 * // Returns: "#0000FF"
 * 
 * @example
 * // Two colors (evenly split 0% and 100%)
 * const gradient = useGradient({ colors: ['blue', 'red'] });
 * // Returns: "linear-gradient(135deg, blue 0%, red 100%)"
 * 
 * @example
 * // Three colors evenly distributed
 * const gradient = useGradient({ colors: ['#0000FF', '#FF0000', '#FFFFFF'] });
 * // Returns: "linear-gradient(135deg, #0000FF 0%, #FF0000 50%, #FFFFFF 100%)"
 * 
 * @example
 * // With theme colors (components pass theme colors themselves)
 * const { theme } = useAppTheme();
 * const gradient = useGradient({ colors: [theme.colors.primary, theme.colors.secondary] });
 * 
 * @example
 * // Custom direction
 * const gradient = useGradient({ 
 *   colors: ['blue', 'red', 'white'], 
 *   direction: '90deg' 
 * });
 * 
 * @example
 * // Radial gradient
 * const gradient = useGradient({ 
 *   colors: ['blue', 'red', 'white'],
 *   type: 'radial'
 * });
 * 
 * @example
 * // Custom percentages (0-1 range, cumulative stops)
 * const gradient = useGradient({ 
 *   colors: ['green', 'darkGreen'],
 *   percentages: [0.5, 1.0]
 * });
 * // green goes from 0% to 50%, darkGreen goes from 50% to 100%
 * // Returns: "linear-gradient(135deg, green 0%, darkGreen 50%)"
 * 
 * @example
 * // If first percentage is 0.25, first color only goes 1/4th of the way
 * const gradient = useGradient({ 
 *   colors: ['green', 'darkGreen'],
 *   percentages: [0.25, 1.0]
 * });
 * // green goes from 0% to 25%, darkGreen goes from 25% to 100%
 * 
 * @example
 * // With opacity (single value for all colors)
 * const gradient = useGradient({ 
 *   colors: ['#0000FF', '#FF0000'],
 *   opacity: 0.5
 * });
 * // Both colors at 50% opacity
 * 
 * @example
 * // With opacity array (different opacity per color)
 * const gradient = useGradient({ 
 *   colors: ['#0000FF', '#FF0000'],
 *   opacity: [1.0, 0.5]
 * });
 * // First color at 100%, second at 50%
 */
/**
 * Converts a hex color to rgba format with specified opacity
 */
const hexToRgba = (hex: string, opacity: number): string => {
  const cleanHex = hex.replace('#', '');
  
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  return hex;
};

/**
 * Applies opacity to a color string
 */
const applyOpacity = (color: string, opacity: number): string => {
  if (opacity === 1) {
    return color;
  }
  
  if (color.startsWith('rgba')) {
    const rgbaMatch = color.match(/rgba?\(([^)]+)\)/);
    if (rgbaMatch) {
      const values = rgbaMatch[1].split(',').map(v => v.trim());
      return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${opacity})`;
    }
  }
  
  if (color.startsWith('#')) {
    return hexToRgba(color, opacity);
  }
  
  return color;
};

/**
 * Validates and normalizes opacity to an array
 */
const validateAndNormalizeOpacity = (
  opacity: number | number[],
  colorCount: number
): number[] => {
  if (typeof opacity === 'number') {
    if (opacity < 0 || opacity > 1) {
      throw new Error(`opacity must be between 0 and 1. Found: ${opacity}`);
    }
    return Array(colorCount).fill(opacity);
  }
  
  if (opacity.length !== colorCount) {
    throw new Error(
      `opacity array length (${opacity.length}) must match colors array length (${colorCount})`
    );
  }
  
  const invalidOpacity = opacity.find((o) => o < 0 || o > 1);
  if (invalidOpacity !== undefined) {
    throw new Error(
      `All opacity values must be between 0 and 1. Found: ${invalidOpacity}`
    );
  }
  
  return opacity;
};

/**
 * Validates percentages array
 */
const validatePercentages = (
  percentages: number[],
  colorCount: number
): void => {
  if (percentages.length !== colorCount) {
    throw new Error(
      `percentages array length (${percentages.length}) must match colors array length (${colorCount})`
    );
  }
  
  const invalidPercentage = percentages.find((p) => p < 0 || p > 1);
  if (invalidPercentage !== undefined) {
    throw new Error(
      `All percentages must be between 0 and 1. Found: ${invalidPercentage}`
    );
  }
  
  const isAscending = percentages.every((val, i) => i === 0 || val > percentages[i - 1]);
  if (!isAscending) {
    throw new Error(
      `percentages must be in ascending order. Found: [${percentages.join(', ')}]`
    );
  }
};

/**
 * Applies opacity to an array of colors
 */
const applyOpacityToColors = (
  colors: string[],
  opacityArray: number[]
): string[] => {
  return colors.map((color, i) => applyOpacity(color, opacityArray[i]));
};

/**
 * Builds color stops using custom percentages
 */
const buildColorStopsWithPercentages = (
  colors: string[],
  percentages: number[]
): string[] => {
  const colorStops: string[] = [];
  colorStops.push(`${colors[0]} 0%`);
  
  for (let i = 1; i < colors.length; i++) {
    const stopPosition = percentages[i - 1] * 100;
    colorStops.push(`${colors[i]} ${stopPosition}%`);
  }
  
  return colorStops;
};

/**
 * Builds color stops with even distribution
 */
const buildColorStopsEvenly = (colors: string[]): string[] => {
  const colorStops: string[] = [];
  const numColors = colors.length;
  
  for (let i = 0; i < numColors; i++) {
    const percentage = i === 0 
      ? '0%' 
      : i === numColors - 1 
      ? '100%' 
      : `${(i / (numColors - 1)) * 100}%`;
    
    colorStops.push(`${colors[i]} ${percentage}`);
  }
  
  return colorStops;
};

/**
 * Builds the final gradient string
 */
const buildGradientString = (
  colorStops: string[],
  type: 'linear' | 'radial',
  direction: string | number,
  radialShape: string
): string => {
  const colorString = colorStops.join(', ');
  
  if (type === 'linear') {
    return `linear-gradient(${direction}, ${colorString})`;
  } else {
    return `radial-gradient(${radialShape}, ${colorString})`;
  }
};

export const useGradient = (options: GradientOptions): string => {
  const {
    colors: colorArray,
    percentages,
    opacity = 1,
    direction = '135deg',
    type = 'linear',
    radialShape = 'circle at center',
  } = options;

  if (colorArray.length === 0) {
    throw new Error('useGradient requires at least one color');
  }

  const opacityArray = validateAndNormalizeOpacity(opacity, colorArray.length);

  if (colorArray.length === 1) {
    return applyOpacity(colorArray[0], opacityArray[0]);
  }

  if (percentages !== undefined) {
    validatePercentages(percentages, colorArray.length);
  }

  const colorsWithOpacity = applyOpacityToColors(colorArray, opacityArray);

  const colorStops = percentages !== undefined
    ? buildColorStopsWithPercentages(colorsWithOpacity, percentages)
    : buildColorStopsEvenly(colorsWithOpacity);

  return buildGradientString(colorStops, type, direction, radialShape);
};

