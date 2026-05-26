export function dayNameLong(dateStr, locale = 'en-US') {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: 'long' });
}
