export function stringifyOptions(options: Intl.DateTimeFormatOptions): string {
  return Object.entries(options)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");
}
