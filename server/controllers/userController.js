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
        res.cookie('session', idToken, {httpOnly: true, secure: true, maxAge: 3600000})

        res.status(200).json({
            message: `Welcome, ${user.firstName}`,
            userId: firebaseUser.uid,
            email: firebaseUser.email
        })
    } catch (error) {
        res.status(500).json({ message: "Login failed", error});
    }
}

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
    loginUser
};
