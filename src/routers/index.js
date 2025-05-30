import Cart from "../pages/Cart/Cart";
import Category from "../pages/Category/Category";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import OrderDetail from "../pages/OrderDetail";
import Orders from "../pages/Orders/Orders";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Register from "../pages/Register/Register";
import Search from "../pages/Search/Search";
import Success from "../pages/Success/Success";
import UpdateCustomer from "../pages/UpdateCustomer";
import AuthRequired from "../shared/AuthRequired";

export const Routers = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/cart",
    element: Cart,
  },
  {
    path: "/category/:id",
    element: Category,
  },
  {
    path: "/productDetail/:id",
    element: ProductDetail,
  },
  {
    path: "/search",
    element: Search,
  },
  {
    path: "/success",
    element: Success,
  },
  {
    path: "/register",
    element: AuthRequired.CheckLogged(Register),
  },
  {
    path: "/login",
    element: AuthRequired.CheckLogged(Login),
  },
  {
    path: "/orders",
    element: AuthRequired.CheckNotLogged(Orders),
  },
  {
    path: "/orderDetail/:id",
    element: OrderDetail,
  },
  {
    path: "/updateCustomer/:id",
    element: AuthRequired.CheckNotLogged(UpdateCustomer),
  },
  {
    path: "*",
    element: NotFound,
  },
];
