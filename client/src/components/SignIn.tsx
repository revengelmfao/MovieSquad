import { Link } from "react-router-dom"

const SignIn: React.FC = () => {
    return (
      <div>
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
                        <form action="#" method="POST" className="space-y-4">
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
                                        className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                    <div className="font-semibold text-indigo-600 hover:text-indigo-500">
                                         <Link to="/forgotpassword">Forgot Password?</Link>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <p className="mt-6 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <Link to="/signup">Sign Up</Link>
                        
                        </p>
                    </div>
                </div>
            </div>
      </div>
    );
  };
  
  export default SignIn;
