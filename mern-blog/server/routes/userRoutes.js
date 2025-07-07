const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/authController');

router.route('/').post(registerUser);
router.post('/login', authUser);

module.exports = router;