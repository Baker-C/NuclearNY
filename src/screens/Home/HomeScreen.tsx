import React, { useMemo } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { useNavBarVariant } from '@/hooks/useNavBarVariant';
import styles from './HomeScreen.module.css';
import { HomeHero, About, News } from './components';
import { ArticleList, ContentSection, mockArticles } from '@/components';

export const HomeScreen: React.FC = () => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);
  
  // Set navbar to glass variant for home screen
  useNavBarVariant('glass');

  return (
    <div className={styles.container} style={themeStyles}>
      <HomeHero />
      <ContentSection className={styles.content}>
        <About />
        <News />
      </ContentSection>
    </div>
  );
};
