import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import MoviesPage from './pages/MoviesPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import EditProfile from './pages/EditProfile.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/moviespage',
        element: <MoviesPage />
      }, 
      {
        path: '/profilepage',
        element: <ProfilePage />
      },  
      {
        path: '/edit-profile',
        element: <EditProfile />
      },
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
