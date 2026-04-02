import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { DevSettings, I18nManager, NativeModules } from 'react-native';
import { initReactI18next } from 'react-i18next';
import RNRestart from 'react-native-restart';
import * as RNLocalize from 'react-native-localize';

const resources = {
  ar: {
    translation: require('./locales/ar.json') as Record<string, string>,
  },
  en: {
    translation: require('./locales/en.json') as Record<string, string>,
  },
} as const;

export type AppLanguage = keyof typeof resources;

const APP_LANGUAGE_STORAGE_KEY = '@app-language';

let initializationPromise: Promise<typeof i18n> | null = null;

function normalizeLanguage(language?: string | null): AppLanguage {
  return language?.toLowerCase().startsWith('ar') ? 'ar' : 'en';
}

function isRTL(language: AppLanguage) {
  return language === 'ar';
}

function syncLayoutDirection(language: AppLanguage) {
  const shouldUseRTL = isRTL(language);
  const didChangeDirection = I18nManager.isRTL !== shouldUseRTL;

  I18nManager.allowRTL(true);
  I18nManager.swapLeftAndRightInRTL(true);
  I18nManager.forceRTL(shouldUseRTL);

  return didChangeDirection;
}

function restartApp() {
  const nativeRestart =
    RNRestart?.restart ??
    RNRestart?.Restart ??
    NativeModules.RNRestart?.restart ??
    NativeModules.RNRestart?.Restart;

  if (typeof nativeRestart === 'function') {
    nativeRestart();
    return;
  }

  if (typeof DevSettings.reload === 'function') {
    DevSettings.reload();
    return;
  }

  console.warn('Restart module is unavailable. Rebuild the app to apply RTL changes.');
}

async function getInitialLanguage() {
  const storedLanguage = await AsyncStorage.getItem(APP_LANGUAGE_STORAGE_KEY);

  if (storedLanguage) {
    return normalizeLanguage(storedLanguage);
  }

  const deviceLanguage = RNLocalize.findBestLanguageTag(['en', 'ar']);

  return normalizeLanguage(deviceLanguage?.languageTag);
}

export function getCurrentLanguage() {
  return normalizeLanguage(i18n.language);
}

export async function initializeI18n() {
  if (i18n.isInitialized) {
    return i18n;
  }

  if (!initializationPromise) {
    initializationPromise = (async () => {
      const language = await getInitialLanguage();
      syncLayoutDirection(language);

      await i18n.use(initReactI18next).init({
        compatibilityJSON: 'v4',
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
        keySeparator: false,
        lng: language,
        nsSeparator: false,
        react: {
          useSuspense: false,
        },
        resources,
        returnNull: false,
      });

      return i18n;
    })();
  }

  return initializationPromise;
}

export async function setAppLanguage(language: AppLanguage) {
  await initializeI18n();
  const didChangeDirection = syncLayoutDirection(language);
  await i18n.changeLanguage(language);
  await AsyncStorage.setItem(APP_LANGUAGE_STORAGE_KEY, language);

  if (didChangeDirection) {
    restartApp();
  }
}

export async function toggleAppLanguage() {
  const nextLanguage = getCurrentLanguage() === 'ar' ? 'en' : 'ar';

  await setAppLanguage(nextLanguage);
}

export default i18n;
