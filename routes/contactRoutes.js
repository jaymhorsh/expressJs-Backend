import express from 'express';
import { getAllContacts, createContact, updateContact, deleteContact, getContactById } from '../controllers/contactControllers.js';
const router = express.Router();
router.route('/').get(getAllContacts).post(createContact);
router.route('/:id').get(getContactById).put(updateContact).delete(deleteContact);

export default router;

//  const express = require('express');
// const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const auth = require('../middleware/auth');

// const router = express.Router();

// // @route   POST /api/auth/register
// // @desc    Register a new user
// // @access  Public
// router.post(
//   '/register',
// [
//   body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
//   body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
// ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           success: false,
//           message: 'Validation errors',
//           errors: errors.array(),
//         });
//       }

//       const { name, email, password } = req.body;

//       // Check if user already exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({
//           success: false,
//           message: 'User already exists with this email',
//         });
//       }

//       // Hash password
//       const saltRounds = 12;
//       const hashedPassword = await bcrypt.hash(password, saltRounds);

//       // Create user
//       const user = new User({
//         name,
//         email,
//         password: hashedPassword,
//       });

//       await user.save();

//       // Generate JWT token
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

//       res.status(201).json({
//         success: true,
//         message: 'User registered successfully',
//         token,
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           pass
//         },
//       });
//     } catch (error) {
//       console.error('Registration error:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Server error during registration',
//       });
//     }
//   },
// );

// // @route   POST /api/auth/login
// // @desc    Login user
// // @access  Public
// router.post(
//   '/login',
//   [
//     body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
//     body('password').notEmpty().withMessage('Password is required'),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           success: false,
//           message: 'Validation errors',
//           errors: errors.array(),
//         });
//       }

//       const { email, password } = req.body;

//       // Find user
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid credentials',
//         });
//       }

//       // Check password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid credentials',
//         });
//       }

//       // Generate JWT token
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

//       res.json({
//         success: true,
//         message: 'Login successful',
//         token,
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//         },
//       });
//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Server error during login',
//       });
//     }
//   },
// );

// // @route   GET /api/auth/me
// // @desc    Get current user
// // @access  Private
// router.get('/me', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select('-password');
//     res.json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.error('Get user error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// });

// module.exports = router;
