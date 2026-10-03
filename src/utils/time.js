const UNITS = [
  { limit: 60, divisor: 1, unit: 'detik' },
  { limit: 3600, divisor: 60, unit: 'menit' },
  { limit: 86400, divisor: 3600, unit: 'jam' },
  { limit: 2592000, divisor: 86400, unit: 'hari' },
  { limit: 31536000, divisor: 2592000, unit: 'bulan' },
];

export function postedAt(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.round((now.getTime() - date.getTime()) / 1000);

  if (Number.isNaN(diffInSeconds)) return '';
  if (diffInSeconds < 5) return 'baru saja';

  const matchedUnit = UNITS.find(({ limit }) => diffInSeconds < limit);

  if (!matchedUnit) {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} tahun yang lalu`;
  }

  const value = Math.floor(diffInSeconds / matchedUnit.divisor);
  return `${value} ${matchedUnit.unit} yang lalu`;
}

export function formatFullDate(dateString) {
  if (!dateString) return '';

  return new Date(dateString).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default { postedAt, formatFullDate };
