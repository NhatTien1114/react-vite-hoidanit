import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './routes/Login.jsx';
import RegisterPage from './routes/Register.jsx';
import UserPage from './routes/User.jsx';
import "./styles/global.css";
import TodoApp from './components/todo/TodoApp.jsx';
import ErrorPage from './routes/Error.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import PrivateRoute from './routes/private.route.jsx';
import Book from './routes/Book.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoApp />,
      },
      {
        path: "/users",
        element: <UserPage />,
      },
      {
        path: "/books",
        element: (
          <PrivateRoute>
            <Book />
          </PrivateRoute>
        ),
      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>,
)
