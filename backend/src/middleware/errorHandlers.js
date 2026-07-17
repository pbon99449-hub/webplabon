export function notFoundHandler(req, res) {
  return res.status(404).json({
    success: false,
    error: { message: 'Route not found' },
  });
}

// Centralized error handling
export function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error('[error]', err);

  const status = err.statusCode || err.status || 500;
  const message = status === 500 ? 'Internal server error' : err.message || 'Request failed';

  return res.status(status).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {}),
    },
  });
}

