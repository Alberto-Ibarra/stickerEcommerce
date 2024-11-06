const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const verifySession = require('../middleware/authMiddleware');

router.post("/", orderController.createOrder);

module.exports = router;