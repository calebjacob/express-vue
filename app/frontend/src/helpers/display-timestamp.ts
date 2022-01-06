import dayjs from 'dayjs';

export default function displayTimestamp(timestamp: string | null | undefined, format = 'M/D/YYYY h:mmA'): string {
  if (!timestamp) {
    return '';
  }

  const result = dayjs(timestamp).format(format);
  return result;
}
