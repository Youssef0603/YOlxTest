import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { palette, spacing, typography } from '@/app/theme';
import { ListingCardProps } from '@/features/listings/model/listing';
import { Icon } from '@/shared/ui/Icon';

import { ListingStat } from './ListingStat';

export function ListingCard({
  item,
  cardWidth = 220,
  containerStyle,
}: ListingCardProps) {
  const Container = item.onPress ? Pressable : View;
  const imageHeight = Math.round(cardWidth * 0.55);

  return (
    <Container
      accessibilityLabel={item.accessibilityLabel ?? item.title}
      accessibilityRole={item.onPress ? 'button' : 'image'}
      onPress={item.onPress}
      style={[styles.card, { width: cardWidth }, containerStyle]}>
      <Image source={item.imageSource} style={[styles.image, { height: imageHeight }]} />

      <View style={styles.content}>
        <View style={styles.priceRow}>
          <Text numberOfLines={1} style={styles.price}>
            {item.price}
          </Text>
          <Pressable
            accessibilityRole={item.onFavoritePress ? 'button' : 'image'}
            disabled={!item.onFavoritePress}
            onPress={item.onFavoritePress}
            style={styles.favoriteButton}>
            <Icon color={palette.textPrimary} name="favorite-border" size={25} />
          </Pressable>
        </View>

        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>

        {item.stats.length ? (
          <View style={styles.statsRow}>
            {item.stats.map(stat => (
              <ListingStat
                iconName={stat.iconName}
                key={stat.id}
                value={stat.value}
              />
            ))}
          </View>
        ) : null}

        <View style={styles.metaBlock}>
          <Text numberOfLines={1} style={styles.metaText}>
            {item.location}
          </Text>
          <Text numberOfLines={1} style={styles.metaText}>
            {item.postedAt}
          </Text>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.borderNeutral,
    borderRadius: 6,
    backgroundColor: palette.white,
    gap: spacing.sm,
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  price: {
    flex: 1,
    color: palette.price,
    fontSize: typography.heading - 2,
    fontWeight: '800',
  },
  favoriteButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: palette.textPrimary,
    fontSize: typography.body +1,
    fontWeight: '400',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  metaBlock: {
    gap: spacing.xs - 1,
  },
  metaText: {
    color: palette.textSecondary,
    fontSize: typography.body + 1,
    lineHeight: 22,
    fontWeight: '400',
  },
});
