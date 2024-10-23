const admin = require('firebase-admin');
const serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const verifySession = async (req, res, next) => {
    const token = req.cookies.session; // Get the token from the HTTP-only cookie
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Attach user data to request object
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token', error });
    }
};

module.exports = verifySession;