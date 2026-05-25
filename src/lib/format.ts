export function formatShortDate(dateString: string): string {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return `${d.getMonth() + 1}.${d.getDate()}`;
}

export function formatDateTime(dateString: string): string {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  return `${d.getMonth() + 1}.${d.getDate()} ${timeStr}`;
}
