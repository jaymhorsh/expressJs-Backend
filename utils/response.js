/**
 * Standard API response helper
 */
const sendResponse = (res, statusCode, success, message, data = null, meta = null) => {
  const response = {
    success,
    message,
    ...(data && { data }),
    ...(meta && { meta }),
  };

  return res.status(statusCode).json(response);
};

/**
 * Success responses
 */
const success = {
  ok: (res, message = 'Success', data = null) => {
    return sendResponse(res, 200, true, message, data);
  },

  created: (res, message = 'Created successfully', data = null) => {
    return sendResponse(res, 201, true, message, data);
  },

  noContent: (res, message = 'No content') => {
    return sendResponse(res, 204, true, message);
  },
};

/**
 * Error responses
 */
const error = {
  badRequest: (res, message = 'Bad request', data = null) => {
    return sendResponse(res, 400, false, message, data);
  },

  unauthorized: (res, message = 'Unauthorized') => {
    return sendResponse(res, 401, false, message);
  },

  forbidden: (res, message = 'Forbidden') => {
    return sendResponse(res, 403, false, message);
  },

  notFound: (res, message = 'Not found') => {
    return sendResponse(res, 404, false, message);
  },

  conflict: (res, message = 'Conflict', data = null) => {
    return sendResponse(res, 409, false, message, data);
  },

  unprocessableEntity: (res, message = 'Unprocessable entity', data = null) => {
    return sendResponse(res, 422, false, message, data);
  },

  tooManyRequests: (res, message = 'Too many requests') => {
    return sendResponse(res, 429, false, message);
  },

  internalServerError: (res, message = 'Internal server error') => {
    return sendResponse(res, 500, false, message);
  },

  serviceUnavailable: (res, message = 'Service unavailable') => {
    return sendResponse(res, 503, false, message);
  },
};

module.exports = {
  success,
  error,
  sendResponse,
};
