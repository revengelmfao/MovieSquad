import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
import type { ExpressContextFunctionArgument } from '@apollo/server/express4';
dotenv.config();

const secret = process.env.JWT_SECRET || 'secretkey';
const expiration = '2h';

export interface TokenUser {
  username: string;
  email: string;
  _id: string;
}

// Define the UserContext interface used by Apollo Server
export interface UserContext {
  user: TokenUser | null;
  token: string | null;
}

// This function properly handles Apollo's context integration
export const authenticateToken = async ({ req }: ExpressContextFunctionArgument): Promise<UserContext> => {
  let token = req.headers.authorization || '';

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trim();
  }

  if (!token) {
    return { user: null, token: null };
  }

  try {
    const { data } = jwt.verify(token, secret) as { data: TokenUser };
    return { user: data, token };
  } catch {
    console.log('Invalid token');
    return { user: null, token: null };
  }
}

export const signToken = (userData: TokenUser): string => {
  const payload = { username: userData.username, email: userData.email, _id: userData._id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
        http: { status: 401 },
      },
    });
  }
}

// Alias for backward compatibility
export type UserType = TokenUser;
