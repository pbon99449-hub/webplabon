export function toNumberSafe(value) {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return NaN;
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

