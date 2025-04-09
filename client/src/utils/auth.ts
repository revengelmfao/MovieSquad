<<<<<<< HEAD
import { jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded: any = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
=======
// use this to decode a token and get the user's information out of it
import { jwtDecode } from 'jwt-decode';

interface UserToken {
  name: string;
  exp: number;
}

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return jwtDecode(this.getToken() || '');
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<UserToken>(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } 
      
      return false;
>>>>>>> f518b33a3f1526da643adaf342f8e155dfdec0e7
    } catch (err) {
      return false;
    }
  }

  getToken() {
<<<<<<< HEAD
=======
    // Retrieves the user token from localStorage
>>>>>>> f518b33a3f1526da643adaf342f8e155dfdec0e7
    return localStorage.getItem('id_token');
  }

  login(idToken: string) {
<<<<<<< HEAD
=======
    // Saves user token to localStorage
>>>>>>> f518b33a3f1526da643adaf342f8e155dfdec0e7
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
<<<<<<< HEAD
    localStorage.removeItem('id_token');
=======
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
>>>>>>> f518b33a3f1526da643adaf342f8e155dfdec0e7
    window.location.assign('/');
  }
}

<<<<<<< HEAD
export default new AuthService();
=======
export default new AuthService();
>>>>>>> f518b33a3f1526da643adaf342f8e155dfdec0e7
