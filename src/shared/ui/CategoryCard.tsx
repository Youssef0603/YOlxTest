import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing, typography } from '@/app/theme';
import { CategoryCardProps } from '@/shared/types/category';

export function CategoryCard({
  item,
  containerStyle,
  imageStyle,
  labelStyle,
}: CategoryCardProps) {
  const { t } = useTranslation();
  const Container = item.onPress ? Pressable : View;

  return (
    <Container
      accessibilityLabel={t(item.accessibilityLabel ?? item.label)}
      accessibilityRole={item.onPress ? 'button' : 'image'}
      onPress={item.onPress}
      style={[styles.container, containerStyle]}>
      <View style={styles.imageWrapper}>
        <Image source={item.imageSource} style={[styles.image, imageStyle]} />
      </View>
      <Text
        style={[styles.label, labelStyle]}>
        {t(item.label)}
      </Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 76,
    alignItems: 'center',
    gap: spacing.sm,
  },
  imageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  label: {
    color: palette.textPrimary,
    fontSize: typography.caption,
    lineHeight: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
