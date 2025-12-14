import React, { createContext, useContext, useState, ReactNode } from 'react';

export type NavBarVariant = 'default' | 'glass';

interface NavBarContextValue {
  variant: NavBarVariant;
  setVariant: (variant: NavBarVariant) => void;
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
}

const NavBarContext = createContext<NavBarContextValue | undefined>(undefined);

export const NavBarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [variant, setVariant] = useState<NavBarVariant>('default');
  const [hidden, setHidden] = useState<boolean>(false);

  return (
    <NavBarContext.Provider value={{ variant, setVariant, hidden, setHidden }}>
      {children}
    </NavBarContext.Provider>
  );
};

export const useNavBar = () => {
  const context = useContext(NavBarContext);
  if (!context) {
    throw new Error('useNavBar must be used within NavBarProvider');
  }
  return context;
};

