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
import { ListingStat } from '@/features/listings/ui/ListingStat';
import type { EliteSearchListing } from '@/features/search/model/searchResults';
import { Icon } from '@/shared/ui/Icon';

type EliteListingCardProps = {
  item: EliteSearchListing;
};

const CARD_WIDTH = Dimensions.get('window').width - spacing.lg * 2;
const IMAGE_HEIGHT = Math.round(CARD_WIDTH * 0.6);

export function EliteListingCard({ item }: EliteListingCardProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <View style={styles.badgeBar}>
        <Icon color={palette.textPrimary} name="workspace-premium" size={20} />
        <Text style={styles.badgeLabel}>{t('Elite')}</Text>
      </View>

      <View style={styles.imageWrapper}>
        <Image source={item.imageSource} style={styles.image} />

        <View style={styles.imageOverlay}>
          <View style={styles.verifiedBadge}>
            <Icon color={palette.link} name="verified" size={18} />
            <Text style={styles.verifiedLabel}>{t('Verified')}</Text>
          </View>

          <Pressable accessibilityRole="button" style={styles.favoriteButton}>
            <Icon color={palette.white} name="favorite-border" size={28} />
          </Pressable>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.price}>{item.price}</Text>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>

        <View style={styles.statsRow}>
          {item.stats.map(stat => (
            <ListingStat iconName={stat.iconName} key={stat.id} value={stat.value} />
          ))}
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaBlock}>
            <Text numberOfLines={1} style={styles.metaText}>
              {item.location}
            </Text>
            <Text numberOfLines={1} style={styles.metaText}>
              {t(item.postedAt)}
            </Text>
          </View>

          {item.partnerLogoSource ? (
            <View style={styles.partnerBadge}>
              <Image source={item.partnerLogoSource} style={styles.partnerLogo} />
            </View>
          ) : null}
        </View>

        <View style={styles.actionsWrapper}>
          <View style={styles.actionsRow}>
            <Pressable
              accessibilityRole="button"
              style={[
                styles.primaryActionButton,
                item.primaryActionVariant === 'soft'
                  ? styles.primaryActionSoft
                  : styles.primaryActionOutlined,
              ]}>
              <Icon
                color={
                  item.primaryActionVariant === 'soft'
                    ? palette.success
                    : palette.textPrimary
                }
                name={item.primaryActionIconName}
                size={24}
              />
              {item.primaryActionLabel ? (
                <Text style={styles.primaryActionLabel}>{t(item.primaryActionLabel)}</Text>
              ) : null}
            </Pressable>

            <Pressable accessibilityRole="button" style={styles.callButton}>
              <Icon color={palette.textPrimary} name="call" size={22} />
              <Text style={styles.callLabel}>{t('Call')}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: palette.accentWarm,
    borderRadius: 6,
    backgroundColor: palette.white,
    shadowColor: palette.shadow,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 3,
  },
  badgeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: palette.accentWarm,
  },
  badgeLabel: {
    color: palette.textPrimary,
    fontSize: typography.heading,
    lineHeight: 28,
    fontWeight: '800',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 10,
    backgroundColor: palette.linkSoft,
  },
  verifiedLabel: {
    color: palette.link,
    fontSize: typography.body + 1,
    lineHeight: 22,
    fontWeight: '800',
  },
  favoriteButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.overlay,
  },
  content: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    paddingTop: spacing.lg,
  },
  price: {
    color: palette.price,
    fontSize: typography.title - 2,
    fontWeight: '800',
  },
  title: {
    color: palette.textPrimary,
    fontSize: typography.heading - 1,
    fontWeight: '400',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  metaBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  metaText: {
    color: palette.textSecondary,
    fontSize: typography.body + 2,
    lineHeight: 24,
    fontWeight: '400',
  },
  partnerBadge: {
    minWidth: 126,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
  },
  partnerLogo: {
    width: '100%',
    height: 38,
    resizeMode: 'contain',
  },
  actionsWrapper: {
    gap: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: palette.divider,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  primaryActionButton: {
    flex: 1,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    gap: spacing.sm,
  },
  primaryActionSoft: {
    backgroundColor: palette.successSoft,
  },
  primaryActionOutlined: {
    borderWidth: 1,
    borderColor: palette.borderNeutral,
    backgroundColor: palette.white,
  },
  primaryActionLabel: {
    color: palette.textPrimary,
    fontSize: typography.heading,
    lineHeight: 28,
    fontWeight: '700',
  },
  callButton: {
    flex: 1,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: palette.borderNeutral,
    borderRadius: 6,
    backgroundColor: palette.white,
  },
  callLabel: {
    color: palette.textPrimary,
    fontSize: typography.heading,
    lineHeight: 28,
    fontWeight: '700',
  },
});
