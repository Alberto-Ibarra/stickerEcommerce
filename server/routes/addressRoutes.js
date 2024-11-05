const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const verifySession = require('../middleware/authMiddleware');

//router.use(verifySession);
router.post("/", addressController.createAddress);

module.exports = router;