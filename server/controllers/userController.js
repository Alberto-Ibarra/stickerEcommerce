const { auth } = require('../config/firebase');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName, address, isAdmin } = req.body;

        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        const user = new User({
            firstName,
            lastName,
            email: firebaseUser.email,
            address,
            isAdmin,
            createdAt: new Date()
        });

        await user.save();

        res.status(200).json({
            message: "Registration successful",
            userId: firebaseUser.uid,
            email: firebaseUser.email
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        const user = await User.findOne({ email: firebaseUser.email });
        
        if (!user) {
            return res.status(404).json({ message: "User not found in the database" });
        }

        const idToken = await firebaseUser.getIdToken();
        res.cookie('session', idToken, {httpOnly: true, secure: true, maxAge: 360000})

        res.status(200).json({
            message: `Welcome, ${user.firstName}`,
            userId: firebaseUser.uid,
            email: firebaseUser.email
        })
    } catch (error) {
        res.status(500).json({ message: "Login failed", error});
    }
}

const refreshToken = async (req, res) => {
    const { token } = req.body; // Expecting the refresh token in the request body

    if (!token) {
        return res.status(401).json({ message: 'Refresh Token Required' });
    }

    // Verify the refresh token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Adjust this based on how you handle refresh tokens

        // Find the user associated with the refresh token (if needed)
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }

        // Generate new access token
        const newAccessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' }); // Set expiration time

        // Optionally issue a new refresh token and save it to the user (if you're using a database for storing refresh tokens)

        res.status(200).json({
            accessToken: newAccessToken,
            // refreshToken: newRefreshToken, // If you create a new refresh token
        });
    } catch (error) {
        console.error("Error refreshing token:", error);
        return res.status(403).json({ message: 'Invalid Refresh Token' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error});
    }
};

module.exports = {
    registerUser,
    getAllUsers,
    loginUser,
    refreshToken
};
