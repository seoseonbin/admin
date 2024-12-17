import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from 'react-router-dom';
import Users from './pages/Users';
import Products from './pages/Products';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Menu from './components/menu/Menu';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import Notices from './pages/Notices';
import ToasterProvider from './components/ToasterProvider';
import User from './pages/User';
import Product from './pages/Product';
import Login from './pages/Login';
import Post from './pages/Post';
import Join from './pages/Join';

function App() {
  const Layout = () => {
    return (
      <div
        id="rootContainer"
        className="w-full p-0 m-0 overflow-visible min-h-screen flex flex-col justify-between"
      >
        <ToasterProvider />
        <ScrollRestoration />
        <div>
          <Navbar />
          <div className="w-full flex gap-0 pt-20 xl:pt-[96px] 2xl:pt-[112px] mb-auto">
            <div className="hidden xl:block xl:w-[250px] 2xl:w-[280px] 3xl:w-[350px] border-r-2 border-base-300 dark:border-slate-700 px-3 xl:px-4 xl:py-1">
              <Menu />
            </div>
            <div className="w-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/users',
          element: <Users />,
        },
        {
          path: '/users/:id',
          element: <User />,
        },
        {
          path: '/products',
          element: <Products />,
        },
        {
          path: '/products/:id',
          element: <Product />,
        },
        {
          path: '/posts',
          element: <Posts />,
        },
        {
          path: '/posts/:id',
          element: <Post />,
        },
        {
          path: '/notices',
          element: <Notices />,
        },      
      ],
      errorElement: <Error />,
    },
    {
      path: '/join',
      element: <Join />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
