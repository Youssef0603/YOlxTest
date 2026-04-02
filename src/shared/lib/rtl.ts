import { I18nManager } from 'react-native';

import type { IconName } from '@/shared/types/icons';

export function getBackIconName(): IconName {
  return I18nManager.isRTL ? 'arrow-forward-ios' : 'arrow-back-ios-new';
}

export function getForwardChevronIconName(): IconName {
  return I18nManager.isRTL ? 'chevron-left' : 'chevron-right';
}
