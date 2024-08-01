import './App.css';
import Header from './component/header';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { setDataProduct } from './redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);

  useEffect(() => {
    (async () => {
      const baseUrl = process.env.REACT_APP_SERVER_DOMAIN;
      const productUrl = new URL('/product', baseUrl);
      const res = await fetch(productUrl);
      if (res.ok) {
        const resData = await res.json();
        dispatch(setDataProduct(resData));
      } else {
        console.error('Failed to fetch product data:', res.status, res.statusText);
      }
    })();
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
