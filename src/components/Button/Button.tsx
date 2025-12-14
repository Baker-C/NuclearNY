import React, { useMemo, ReactNode } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { DefaultArrowIcon } from '@/icons';
import styles from './Button.module.css';

export interface ButtonAccessory {
  side?: 'left' | 'right';
  icon?: ReactNode;
}

export interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'primary' | 'secondary' | 'error';
  accessory?: ButtonAccessory;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text = 'Button',
  onClick = () => {console.log('Button clicked');},
  type = 'primary',
  accessory,
  className,
  disabled = false,
}) => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);

  const buttonClasses = [
    styles.button,
    styles[type],
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const accessorySide = accessory?.side || 'left';
  const accessoryIcon = accessory?.icon !== undefined 
    ? accessory.icon 
    : (accessory ? <DefaultArrowIcon className={styles.icon} /> : null);

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      style={themeStyles}
    >
      {accessoryIcon && accessorySide === 'left' && (
        <span className={styles.iconLeft}>{accessoryIcon}</span>
      )}
      <span className={styles.text}>{text}</span>
      {accessoryIcon && accessorySide === 'right' && (
        <span className={styles.iconRight}>{accessoryIcon}</span>
      )}
    </button>
  );
};

