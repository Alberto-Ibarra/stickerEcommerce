const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const verifySession = require('../middleware/authMiddleware');

router.get('/carts', cartController.getCart);
router.post('/addItems', cartController.addItemToCart);

module.exports = router;