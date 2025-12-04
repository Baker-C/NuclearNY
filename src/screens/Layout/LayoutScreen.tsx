import React, { lazy, Suspense, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import styles from './LayoutScreen.module.css';

const HomeScreen = lazy(() => import('@/screens/Home'));
const CMSScreen = lazy(() => import('@/screens/CMS'));
const NotFoundScreen = lazy(() => import('@/screens/NotFound'));

const LoadingFallback = () => {
  return <div className={styles.loading}>Loading...</div>;
};

export const LayoutScreen: React.FC = () => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);

  return (
    <div className={styles.layout} style={themeStyles}>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/:pageId" element={<CMSScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

