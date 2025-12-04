import React, { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HomeScreen } from '@/screens/Home';
import { CMSScreen } from '@/screens/CMS';
import { NotFoundScreen } from '@/screens/NotFound';
import styles from './LayoutScreen.module.css';

export const LayoutScreen: React.FC = () => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);

  return (
    <div className={styles.layout} style={themeStyles}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/:pageId" element={<CMSScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

