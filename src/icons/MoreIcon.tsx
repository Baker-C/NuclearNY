import React from 'react';

export interface MoreIconProps {
  className?: string;
}

export const MoreIcon: React.FC<MoreIconProps> = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="1"
      fill="currentColor"
    />
    <circle
      cx="19"
      cy="12"
      r="1"
      fill="currentColor"
    />
    <circle
      cx="5"
      cy="12"
      r="1"
      fill="currentColor"
    />
  </svg>
);

