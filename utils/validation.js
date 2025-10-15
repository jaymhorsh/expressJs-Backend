const { body, param, query, validationResult } = require('express-validator');

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array(),
    });
  }
  next();
};

/**
 * Common validation rules
 */
const commonValidations = {
  // User validations
  name: body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

  email: body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),

  password: body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),

  // Post validations
  title: body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),

  content: body('content').trim().isLength({ min: 1 }).withMessage('Content is required'),

  // ID validations
  mongoId: param('id').isMongoId().withMessage('Invalid ID format'),

  // Pagination validations
  page: query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),

  limit: query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
};

/**
 * Validation middleware arrays
 */
const userValidations = {
  register: [commonValidations.name, commonValidations.email, commonValidations.password, handleValidationErrors],

  login: [commonValidations.email, body('password').notEmpty().withMessage('Password is required'), handleValidationErrors],

  update: [commonValidations.name.optional(), commonValidations.email.optional(), handleValidationErrors],
};

const postValidations = {
  create: [commonValidations.title, commonValidations.content, handleValidationErrors],

  update: [commonValidations.title.optional(), commonValidations.content.optional(), handleValidationErrors],
};

module.exports = {
  commonValidations,
  userValidations,
  postValidations,
  handleValidationErrors,
};


