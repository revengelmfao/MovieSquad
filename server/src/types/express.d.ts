import { TokenUser } from '../services/auth';

// Properly extend Express types globally
declare global {
  namespace Express {
    interface Request {
      user?: TokenUser;
    }
  }
}

// This export is needed to make it a module
export {};