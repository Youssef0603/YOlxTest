import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { palette, spacing, typography } from '@/app/theme';
import type { FeaturedBusiness } from '@/features/search/model/searchResults';

type FeaturedBusinessItemProps = {
  item: FeaturedBusiness;
};

export function FeaturedBusinessItem({ item }: FeaturedBusinessItemProps) {
  return (
    <View style={styles.container}>
      {item.id === 'transmotor' ? (
        <View style={[styles.logoBox, styles.transmotorLogoBox]}>
          <Text style={styles.transmotorSmall}>TRANSMOTOR</Text>
          <Text style={styles.transmotorLarge}>Moubarak</Text>
        </View>
      ) : null}

      {item.id === 'tohme' ? (
        <View style={[styles.logoBox, styles.tohmeLogoBox]}>
          <Text style={styles.tohmeLogoMark}>TM</Text>
          <Text style={styles.tohmeLogoText}>Tohme Motors</Text>
        </View>
      ) : null}

      {item.id === 'elegant' ? (
        <View style={[styles.logoBox, styles.elegantLogoBox]}>
          <Text style={styles.elegantLogoMark}>ELEGANT MOTORS</Text>
          <Text style={styles.elegantLogoSubtext}>A Better way to buy a car</Text>
        </View>
      ) : null}

      {item.id === 'sia' ? (
        <View style={[styles.logoBox, styles.siaLogoBox]}>
          <Text style={styles.siaLogoText}>SIA</Text>
          <Text style={styles.siaLogoSubtext}>REAL ESTATE</Text>
        </View>
      ) : null}

      {item.id === 'yas' ? (
        <View style={[styles.logoBox, styles.yasLogoBox]}>
          <Text style={styles.yasLogoText}>yas</Text>
          <Text style={styles.yasLogoSubtext}>Real Estate</Text>
        </View>
      ) : null}

      {item.id === 'raywhite' ? (
        <View style={[styles.logoBox, styles.raywhiteLogoBox]}>
          <Text numberOfLines={1} style={styles.raywhiteLogoText}>
            RayWhite
          </Text>
        </View>
      ) : null}

      <Text style={styles.name}>{item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.md,
  },
  logoBox: {
    width: '100%',
    height: 70,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  siaLogoBox: {
    borderWidth: 1,
    borderColor: palette.borderNeutral,
    backgroundColor: palette.white,
  },
  siaLogoText: {
    color: palette.goldDeep,
    fontSize: typography.heading + 6,
    lineHeight: 28,
    fontWeight: '800',
  },
  siaLogoSubtext: {
    color: palette.textPrimary,
    fontSize: typography.caption - 1,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  yasLogoBox: {
    borderWidth: 1,
    borderColor: palette.borderNeutral,
    backgroundColor: palette.white,
  },
  yasLogoText: {
    color: palette.price,
    fontSize: typography.heading + 8,
    lineHeight: 30,
    fontWeight: '900',
  },
  yasLogoSubtext: {
    color: palette.textPrimary,
    fontSize: typography.caption,
    lineHeight: 16,
    fontWeight: '700',
  },
  raywhiteLogoBox: {
    backgroundColor: palette.accentWarm,
  },
  raywhiteLogoText: {
    color: palette.textPrimary,
    fontSize: typography.heading + 3,
    lineHeight: 30,
    fontWeight: '900',
  },
  transmotorLogoBox: {
    borderWidth: 1,
    borderColor: palette.borderNeutral,
    backgroundColor: palette.white,
  },
  transmotorSmall: {
    color: palette.textPrimary,
    fontSize: typography.caption - 2,
    lineHeight: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  transmotorLarge: {
    color: palette.textPrimary,
    fontSize: typography.body + 1,
    lineHeight: 22,
    fontWeight: '800',
  },
  tohmeLogoBox: {
    borderWidth: 1,
    borderColor: palette.borderNeutral,
    backgroundColor: palette.white,
  },
  tohmeLogoMark: {
    color: palette.textPrimary,
    fontSize: typography.heading + 10,
    lineHeight: 30,
    fontWeight: '900',
    letterSpacing: -1,
  },
  tohmeLogoText: {
    color: palette.textPrimary,
    fontSize: typography.caption,
    lineHeight: 16,
    fontWeight: '700',
  },
  elegantLogoBox: {
    borderWidth: 1,
    borderColor: palette.borderNeutral,
    backgroundColor: palette.white,
  },
  elegantLogoMark: {
    color: palette.textSecondary,
    fontSize: typography.body,
    lineHeight: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  elegantLogoSubtext: {
    color: palette.textSecondary,
    fontSize: typography.caption - 2,
    lineHeight: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  name: {
    color: palette.textPrimary,
    fontSize: typography.body,
    lineHeight: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
});
