import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { Request } from 'express';

// Set token secret and expiration
const secret = process.env.JWT_SECRET || 'mysecretsshhhhh';
const expiration = '2h';

// Define the UserContext interface
export interface UserContext {
  user?: {
    _id: string;
    username: string;
    email: string;
  };
}

// Auth middleware function
export const authMiddleware = ({ req }: { req: Request }): UserContext => {
  // Get token from request
  let token = req.headers.authorization || '';

  // Remove "Bearer" from token string if present
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  // If no token, return empty context
  if (!token) {
    return {};
  }

  try {
    // Verify token and extract user data
    const { data } = jwt.verify(token, secret) as { data: UserContext['user'] };
    return { user: data };
  } catch (err) {
    console.log('Invalid token');
    return {};
  }
};

// Error handling for authentication
export const AuthenticationError = new GraphQLError('Could not authenticate user.', {
  extensions: {
    code: 'UNAUTHENTICATED',
  },
});

// Function to sign a token with user data
export const signToken = ({ _id, username, email }: UserContext['user']) => {
  const payload = { _id, username, email };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export default { signToken, authMiddleware, AuthenticationError };
