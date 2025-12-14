import { useEffect } from 'react';
import { useNavBar, NavBarVariant } from '@/providers/NavBarProvider';

export const useNavBarVariant = (variant: NavBarVariant) => {
  const { setVariant } = useNavBar();

  useEffect(() => {
    setVariant(variant);
    // Reset to default when component unmounts
    return () => {
      setVariant('default');
    };
  }, [variant, setVariant]);
};

