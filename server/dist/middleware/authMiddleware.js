import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET || 'secretkey';
// Authentication middleware for REST API routes
export const authMiddleware = (req, res, next) => {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1] || '';
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    try {
        // Verify token
        const { data } = jwt.verify(token, secret);
        // Use a more forceful type assertion to bypass the type checking
        req.user = data;
        next();
    }
    catch (err) {
        console.error('Invalid token:', err);
        res.status(401).json({ message: 'Invalid token' });
        return;
    }
};
