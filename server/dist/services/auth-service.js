import jwt from 'jsonwebtoken';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.JWT_SECRET || 'secretkey';
const expiration = '2h';
// This function properly handles Apollo's context integration
export const authenticateToken = async ({ req }) => {
    let token = req.headers.authorization || '';
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trim();
    }
    if (!token) {
        return { user: null, token: null };
    }
    try {
        const { data } = jwt.verify(token, secret);
        // Add logging for debugging
        console.log('Token verified successfully, user:', data.username);
        return { user: data, token };
    }
    catch (error) {
        console.log('Invalid token:', error instanceof Error ? error.message : 'Unknown error');
        return { user: null, token: null };
    }
};
export const signToken = ({ username, email, _id }) => {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
export class AuthenticationError extends GraphQLError {
    constructor(message) {
        super(message, {
            extensions: {
                code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                http: { status: 401 },
            },
        });
    }
}
