import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing, typography } from '@/app/theme';
import type { FeaturedSearchListing } from '@/features/search/model/searchResults';
import { Icon } from '@/shared/ui/Icon';

type FeaturedSearchListingCardProps = {
  item: FeaturedSearchListing;
};

const CARD_WIDTH = Dimensions.get('window').width - spacing.lg * 2;
const IMAGE_WIDTH = Math.round(CARD_WIDTH * 0.35);
const CARD_HEIGHT = 185;

export function FeaturedSearchListingCard({
  item,
}: FeaturedSearchListingCardProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={item.imageSource} style={styles.image} />

        <View style={styles.featuredBadge}>
          <Text style={styles.featuredLabel}>{t('Featured')}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.topBlock}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{item.price}</Text>

            <Pressable accessibilityRole="button" style={styles.favoriteButton}>
              <Icon color={palette.textPrimary} name="favorite-border" size={24} />
            </Pressable>
          </View>

          <Text style={styles.title}>
            {item.title}
          </Text>

          <Text numberOfLines={1} style={styles.location}>
            {item.location}
          </Text>

          {item.verifiedLabel ? (
            <View style={styles.verifiedBadge}>
              <Icon color={palette.link} name="verified" size={18} />
              <Text style={styles.verifiedLabel}>{t(item.verifiedLabel)}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.bottomRow}>
          <Text numberOfLines={1} style={styles.postedAt}>
            {t(item.postedAt)}
          </Text>

          <View style={styles.partnerLogoWrapper}>
            <Image source={item.partnerLogoSource} style={styles.partnerLogo} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.borderNeutral,
    borderRadius: 6,
    backgroundColor: palette.white,
  },
  imageWrapper: {
    width: IMAGE_WIDTH,
    height: CARD_HEIGHT,
    position: 'relative',
    backgroundColor: palette.surfaceSection,
  },
  image: {
    width: IMAGE_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  featuredBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm - 1,
    borderRadius: 6,
    backgroundColor: palette.accentWarm,
  },
  featuredLabel: {
    color: palette.textPrimary,
    fontSize: typography.label - 3,
    fontWeight: '800',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  topBlock: {
    gap: spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  price: {
    flex: 1,
    color: palette.price,
    fontSize: typography.body + 1,
    fontWeight: '800',
  },
  favoriteButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: palette.textPrimary,
    fontSize: typography.heading - 2,
    fontWeight: '400',
  },
  location: {
    color: palette.textSecondary,
    fontSize: typography.body + 2,
    fontWeight: '400',
  },
  verifiedBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs + 1,
    borderRadius: 6,
    backgroundColor: palette.linkSoft,
  },
  verifiedLabel: {
    color: palette.link,
    fontSize: typography.label,
    fontWeight: '800',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  postedAt: {
    flex: 1,
    color: palette.textSecondary,
    fontSize: typography.body + 2,
    fontWeight: '400',
  },
  partnerLogoWrapper: {
    width: 110,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
