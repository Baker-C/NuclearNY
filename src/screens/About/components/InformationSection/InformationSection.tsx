import React, { useMemo } from 'react';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';
import { Image } from '@/components/Image';
import styles from './InformationSection.module.css';

export interface InformationItem {
  text: string;
  image?: string;
}

export interface InformationSectionProps {
  items: InformationItem[];
  className?: string;
}

export const InformationSection: React.FC<InformationSectionProps> = ({
  items,
  className,
}) => {
  const { theme } = useAppTheme();
  const themeStyles = useMemo(() => createStyles(theme), [theme]);

  const containerClasses = [
    styles.container,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      className={containerClasses}
      style={themeStyles}
    >
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          {item.image && (
            <div className={styles.imageContainer}>
              <Image
                src={item.image}
                alt=""
                width={300}
                height={200}
                objectFit="cover"
                className={styles.image}
              />
            </div>
          )}
          <p className={styles.text}>{item.text}</p>
        </div>
      ))}
    </section>
  );
};

