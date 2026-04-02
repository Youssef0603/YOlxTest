export function formatRelativeTime({
  language,
  timestampSeconds,
}: {
  language: string;
  timestampSeconds?: number;
}) {
  if (!timestampSeconds) {
    return '';
  }

  const nowSeconds = Date.now() / 1000;
  const diffSeconds = Math.max(1, Math.floor(nowSeconds - timestampSeconds));

  const formatters: Array<{
    divisor: number;
    threshold: number;
    unit: Intl.RelativeTimeFormatUnit;
  }> = [
    { divisor: 60, threshold: 60, unit: 'second' },
    { divisor: 60 * 60, threshold: 60 * 60, unit: 'minute' },
    { divisor: 60 * 60 * 24, threshold: 60 * 60 * 24, unit: 'hour' },
    { divisor: 60 * 60 * 24 * 7, threshold: 60 * 60 * 24 * 7, unit: 'day' },
    { divisor: 60 * 60 * 24 * 30, threshold: 60 * 60 * 24 * 30, unit: 'week' },
    { divisor: 60 * 60 * 24 * 365, threshold: 60 * 60 * 24 * 365, unit: 'month' },
  ];

  let value = diffSeconds;
  let unit: Intl.RelativeTimeFormatUnit = 'year';

  for (const formatter of formatters) {
    if (diffSeconds < formatter.threshold) {
      value = Math.floor(diffSeconds / Math.max(1, formatter.divisor / (formatter.unit === 'second' ? 1 : formatter.divisor)));
      unit = formatter.unit;
      break;
    }
  }

  if (unit === 'second') {
    value = diffSeconds;
  } else if (unit === 'minute') {
    value = Math.floor(diffSeconds / 60);
  } else if (unit === 'hour') {
    value = Math.floor(diffSeconds / (60 * 60));
  } else if (unit === 'day') {
    value = Math.floor(diffSeconds / (60 * 60 * 24));
  } else if (unit === 'week') {
    value = Math.floor(diffSeconds / (60 * 60 * 24 * 7));
  } else if (unit === 'month') {
    value = Math.floor(diffSeconds / (60 * 60 * 24 * 30));
  } else {
    value = Math.floor(diffSeconds / (60 * 60 * 24 * 365));
  }

  try {
    return new Intl.RelativeTimeFormat(language, {
      numeric: 'auto',
    }).format(-value, unit);
  } catch {
    return `${value} ${unit}${value === 1 ? '' : 's'} ago`;
  }
}
