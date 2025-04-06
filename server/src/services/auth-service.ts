import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { Request } from 'express';
import dotenv from 'dotenv';
dotenv.config();

// Add the UserContext interface export
export interface UserContext {
  user: {
    username: string;
    email: string;
    _id: string;
  } | null;
  token: string | null;
}

// Return a Promise to match Apollo's expected context type
export const authMiddleware = async ({ req }: { req: Request }): Promise<UserContext> => {
  let token = req.body?.token || req.query?.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop()?.trim() || '';
  }

  if (!token) {
    return { user: null, token: null };
  }

  try {
    const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' });
    return { user: data, token };
  } catch (err) {
    console.log('Invalid token');
    return { user: null, token: null };
  }
};

// Fixed export for authenticateToken (for server.ts)
export const authenticateToken = authMiddleware;

// Fix signature to match how it's called in resolvers
export const signToken = ({ username, email, _id }: { username: string; email: string; _id: string }) => {
  const payload = { username, email, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY;

  return jwt.sign({data: payload}, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}
