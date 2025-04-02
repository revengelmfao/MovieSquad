import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthenticatedRequest extends Request {
    user: {
        id: string;
        email: string;
        name: string;
    };
}

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; email: string; name: string };
        req.user = {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name,
        };
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default authenticateToken;