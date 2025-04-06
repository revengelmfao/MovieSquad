import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Ensure JWT secret is available
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

// Define the JWT payload interface
interface JWTPayload {
    username: string; // Change to match expected payload
    email: string;
    _id: string; // Change to match expected payload
    exp?: number;
}

// Update interface to match what's expected
interface AuthenticatedRequest extends Request {
    user: {
        username: string; // Make this required
        email: string;
        _id: string; // Match what's used in auth-service
    };
}

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Extract the token from the Bearer format
    const token = bearerToken.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
        req.user = {
            username: decoded.username, // Update to match the payload structure
            email: decoded.email,
            _id: decoded._id, // Update to match the payload structure
        };
        return next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expired' });
        }
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        // Handle any other unexpected errors
        return res.status(500).json({ message: 'Internal server error during authentication' });
    }
};

export default authenticateToken;