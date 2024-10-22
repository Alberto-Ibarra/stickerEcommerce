const { auth } = require('../config/firebase');
const { createUserWithEmailAndPassword } = require('firebase/auth');
const User = require('../models/User');

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
    getAllUsers
};
