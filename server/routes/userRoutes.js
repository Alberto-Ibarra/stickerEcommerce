const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifySession = require('../middleware/authMiddleware');

//public routes
router.post("/signup", userController.registerUser);
router.post("/login", userController.loginUser);

// Refresh token route
router.post("/refresh-token", userController.refreshToken);

//protected routes
router.use(verifySession);
router.get("/users", userController.getAllUsers);

module.exports = router;