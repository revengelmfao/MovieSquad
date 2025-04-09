import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token);
      // Redirect to home or dashboard
      navigate('/');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ variables: { ...formState } });
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="bg-orange-500 rounded-lg flex min-h-[60vh] flex-1 flex-col justify-center px-4 py-6 lg:px-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-8 w-auto"
        />
        <h2 className="mt-6 text-center text-lg font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={formState.password}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
            {error && (
              <p className="text-sm text-red-600 text-center">
                Login failed. Please check your credentials.
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign Up!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
