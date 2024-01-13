const express = require('express');
const router = express.Router();

const {
  create,
  login,
  editUser,
} = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');

// Route to add a user
router.post('/create', create);

// Route to login a user
router.post('/login', login);

// Route to edit user details
router.put('/edit', authMiddleware, editUser);

module.exports = router;