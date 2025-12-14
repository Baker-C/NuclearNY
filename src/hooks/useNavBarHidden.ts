import { useEffect } from 'react';
import { useNavBar } from '@/providers/NavBarProvider';

export const useNavBarHidden = (hidden: boolean) => {
  const { setHidden } = useNavBar();

  useEffect(() => {
    setHidden(hidden);
    // Reset to showing (false) when component unmounts
    return () => {
      setHidden(false);
    };
  }, [hidden, setHidden]);
};

