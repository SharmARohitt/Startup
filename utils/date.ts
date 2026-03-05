export const formatEventDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};
