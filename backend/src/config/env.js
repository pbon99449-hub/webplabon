export function requireEnv(name) {
  const v = process.env[name];
  if (v === undefined || v === null || String(v).trim() === '') {
    const err = new Error(`Missing required environment variable: ${name}`);
    err.statusCode = 500;
    throw err;
  }
  return v;
}

export function optionalEnv(name, fallback = '') {
  const v = process.env[name];
  if (v === undefined || v === null) return fallback;
  return v;
}

