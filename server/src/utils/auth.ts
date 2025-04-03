import jwt from 'jsonwebtoken';

// Set token secret and expiration date
const secret = process.env.JWT_SECRET || 'localsecretkey';
const expiration = '2h';

// Define the UserContext interface
export interface UserContext {
  user: { username?: string; email?: string; _id?: string } | null;
  token?: string;
}

// Custom authentication error class
export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

// Function for signing tokens
export const signToken = ({ username, email, _id }: { username: string, email: string, _id: string }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

// Function to authenticate requests - modified to return a Promise
export const authMiddleware = async ({ req }: { req: any }): Promise<UserContext> => {
  // Get token from request
  let token = req.body?.token || req.query?.token || req.headers?.authorization;

  // Format token if it comes from headers
  if (req.headers?.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return { user: null };
  }

  // Verify token and get user data
  try {
    const { data } = jwt.verify(token, secret) as { data: any };
    return { user: data, token };
  } catch {
    console.log('Invalid token');
    return { user: null };
  }
};

export default { signToken, authMiddleware, AuthenticationError };
