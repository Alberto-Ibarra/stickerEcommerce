const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const verifySession = require('../middleware/authMiddleware');

router.get('/', cartController.getCart);

module.exports = router;