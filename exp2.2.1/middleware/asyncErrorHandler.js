// middleware/asyncErrorHandler.js
// Async error handler middleware to catch errors from async route handlers
const asyncErrorHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncErrorHandler;