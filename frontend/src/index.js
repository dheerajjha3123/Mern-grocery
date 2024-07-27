import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import{createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import Home from './page/Home';
import Menu from './page/Menu';
import About from './page/About';
import Contact from './page/Contact';
import Login from './page/login';
import Newproduct from './page/Newproduct';
import Singup from './page/Singup';
import { store } from './redux/index';
import { Provider } from 'react-redux';
import Cart from './page/Cart';
import CartCheckout from './page/CartCheckout';
import Order from './page/Order';
import UserOrder from './page/UserOrder';
import AdminOrdes from './page/AdminOrdes';
import AdminAllProduct from './component/AdminAllProduct';
import EditProduct from './component/EditProduct';



const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<Home/>}/>
      {/*<Route path='menu' element={<Menu/>}/> */}
      <Route path='menu/:filterBy' element={<Menu/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='newproduct' element={<Newproduct/>}/>
      <Route path='singup' element={<Singup/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='cartcheckout' element={<CartCheckout />} />
      <Route path='ordersucces' element={<Order />} />
      <Route path='userOrder' element={<UserOrder />} />
      <Route path='adminOrder' element={<AdminOrdes />} />
      <Route path='allProduct' element={<AdminAllProduct />} />
      <Route path='editProduct' element={<EditProduct />} />





     
     



    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
