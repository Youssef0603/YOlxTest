export function formatCurrency({
  currency = 'USD',
  language = 'en',
  value,
}: {
  currency?: string;
  language?: string;
  value: number;
}) {
  return new Intl.NumberFormat(language === 'ar' ? 'ar-LB' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
