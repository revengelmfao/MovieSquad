import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from './mutations';

// Define the shape of our auth context
interface AuthContextType {
  isLoggedIn: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: async () => false,
  logout: () => {},
});

// Provider component to wrap around our app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.loggedIn());
  const [user, setUser] = useState<any | null>(AuthService.getProfile());
  const navigate = useNavigate();
  const [loginUser] = useMutation(LOGIN_USER);

  // Check authentication status on mount and when token changes
  useEffect(() => {
    // Update state if auth status changes
    const checkAuth = () => {
      setIsLoggedIn(AuthService.loggedIn());
      setUser(AuthService.getProfile());
    };

    // Check immediately
    checkAuth();

    // Optional: Set up listener for storage events to detect login/logout in other tabs
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Login function using GraphQL mutation instead of REST endpoint
  const login = async (email: string, password: string) => {
    try {
      console.log(`Attempting to login with: ${email}`);
      
      const { data } = await loginUser({
        variables: { email, password }
      });
      
      if (data && data.login && data.login.token) {
        console.log('Login successful:', data.login.user.username);
        AuthService.login(data.login.token);
        setIsLoggedIn(true);
        setUser(AuthService.getProfile());
        return true;
      } else {
        console.error('Login failed: No token returned');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
