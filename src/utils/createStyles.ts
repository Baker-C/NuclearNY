import { Theme } from '@/theme';
import { CSSProperties } from 'react';

export const createStyles = (theme: Theme): CSSProperties => {
  return {
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-background': theme.colors.background,
    '--color-surface': theme.colors.surface,
    '--color-text': theme.colors.text,
    '--color-textSecondary': theme.colors.textSecondary,
    '--color-error': theme.colors.error,
    '--color-success': theme.colors.success,
    '--color-warning': theme.colors.warning,
    '--spacing-xs': theme.spacing.xs,
    '--spacing-sm': theme.spacing.sm,
    '--spacing-md': theme.spacing.md,
    '--spacing-lg': theme.spacing.lg,
    '--spacing-xl': theme.spacing.xl,
    '--spacing-xxl': theme.spacing.xxl,
    '--font-size-xs': theme.fonts.sizes.xs,
    '--font-size-sm': theme.fonts.sizes.sm,
    '--font-size-md': theme.fonts.sizes.md,
    '--font-size-lg': theme.fonts.sizes.lg,
    '--font-size-xl': theme.fonts.sizes.xl,
    '--font-size-xxl': theme.fonts.sizes.xxl,
    '--font-size-xxxl': theme.fonts.sizes.xxxl,
    '--font-family-sans': theme.fonts.families.sans,
    '--font-family-serif': theme.fonts.families.serif,
    '--font-family-mono': theme.fonts.families.mono,
    '--font-weight-light': theme.fonts.weights.light,
    '--font-weight-normal': theme.fonts.weights.normal,
    '--font-weight-medium': theme.fonts.weights.medium,
    '--font-weight-semibold': theme.fonts.weights.semibold,
    '--font-weight-bold': theme.fonts.weights.bold,
  } as CSSProperties;
};

