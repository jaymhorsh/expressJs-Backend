// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const User = require('../models/User');
// const auth = require('../middleware/auth');

// const router = express.Router();

// // @route   GET /api/users
// // @desc    Get all users
// // @access  Private
// router.get('/', auth, async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const users = await User.find().select('-password').skip(skip).limit(limit).sort({ createdAt: -1 });

//     const total = await User.countDocuments();

//     res.json({
//       success: true,
//       data: users,
//       pagination: {
//         page,
//         limit,
//         total,
//         pages: Math.ceil(total / limit),
//       },
//     });
//   } catch (error) {
//     console.error('Get users error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// });

// // @route   GET /api/users/:id
// // @desc    Get user by ID
// // @access  Private
// router.get('/:id', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select('-password');

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     res.json({
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     console.error('Get user error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// });

// // @route   PUT /api/users/:id
// // @desc    Update user
// // @access  Private
// router.put(
//   '/:id',
//   [
//     auth,
//     body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
//     body('email').optional().isEmail().normalizeEmail().withMessage('Please provide a valid email'),
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

//       // Check if user is updating their own profile or is admin
//       if (req.userId !== req.params.id) {
//         return res.status(403).json({
//           success: false,
//           message: 'Not authorized to update this user',
//         });
//       }

//       const { name, email } = req.body;
//       const updateData = {};

//       if (name) updateData.name = name;
//       if (email) updateData.email = email;

//       const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true }).select('-password');

//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           message: 'User not found',
//         });
//       }

//       res.json({
//         success: true,
//         message: 'User updated successfully',
//         data: user,
//       });
//     } catch (error) {
//       console.error('Update user error:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Server error',
//       });
//     }
//   },
// );

// // @route   DELETE /api/users/:id
// // @desc    Delete user
// // @access  Private
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     // Check if user is deleting their own profile or is admin
//     if (req.userId !== req.params.id) {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized to delete this user',
//       });
//     }

//     const user = await User.findByIdAndDelete(req.params.id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     res.json({
//       success: true,
//       message: 'User deleted successfully',
//     });
//   } catch (error) {
//     console.error('Delete user error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// });

// module.exports = router;
