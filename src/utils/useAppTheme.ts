import { useTheme } from 'styled-components';
import { Theme } from '@/theme';

export const useAppTheme = () => {
  const theme = useTheme() as Theme;
  return { theme };
};

