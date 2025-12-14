export interface ThemeColors {
  primary: string;
  secondary: string;
  primaryBg: string;
  secondaryBg: string;
  primaryText: string;
  secondaryText: string;
  lightGreen: string;
  green: string;
  darkGreen: string;
  blue: string;
  darkBlue: string;
  lightGray: string;
  darkGray: string;
  offWhite: string;
  white: string;
  black: string;
  [key: string]: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
  maxl: string;
  maxWidth: string;
  [key: string]: string;
}

export interface ThemeFonts {
  sizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    [key: string]: string;
  };
  families: {
    sans: string;
    serif: string;
    mono: string;
    [key: string]: string;
  };
  weights: {
    light: string;
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
    [key: string]: string;
  };
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  fonts: ThemeFonts;
}

