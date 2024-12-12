import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
// layouts
import MainLayout from "./layouts/MainLayout";
// pages
import {
  About,
  Cart,
  Contact,
  Home,
  Login,
  Register,
  SingleProduct,
} from "./pages";
// loader
import { loader as HomeLoader } from "./pages/Home";
import { loader as SingleProductLoader } from "./pages/SingleProduct";
// component
import { ProtectedRoutes } from "./components";
function App() {
  const user = true;
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
          loader: HomeLoader,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/singleproduct/:id",
          element: <SingleProduct />,
          loader: SingleProductLoader,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
    },
  ]);
  return <RouterProvider router={routes} />;
}
export default App;
