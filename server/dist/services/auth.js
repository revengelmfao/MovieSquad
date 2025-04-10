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
        return { user: data, token };
    }
    catch {
        console.log('Invalid token');
        return { user: null, token: null };
    }
};
export const signToken = (userData) => {
    const payload = { username: userData.username, email: userData.email, _id: userData._id };
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
