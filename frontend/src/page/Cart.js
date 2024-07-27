import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartProductItem from "../component/CartProductItem";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from '@stripe/stripe-js';
import { navigate, useNavigate } from "react-router-dom";

const Cart = () => {
 const productCartItem = useSelector((state) => state.product.cartItem);
 const user = useSelector(state => state.user)
 const navigate = useNavigate(); 
 const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
 );
 const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
 );

 
 const handlePayment = () => {
  if (user.email) {
     // Navigate to the checkout page
     navigate('/cartcheckout', { state: { cartItems: productCartItem } });
  } else {
     toast("You have not Login!");
     setTimeout(() => {
       navigate("/login");
     }, 1000);
  }
 };


 return (
  
    <>
   


      {productCartItem[0] ? (
        <div className="h-screen pt-20">
          <h1 className="mb-10 text-center text-2xl font-bold">Your Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                 <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {productCartItem.map((el) => (
                        <CartProductItem
                          key={el._id}
                          id={el._id}
                          name={el.name}
                          image={el.image}
                          category={el.category}
                          qty={el.qty}
                          total={el.total}
                          price={el.price}
                        />
                      ))}
                    </h2>
                    <p className="mt-1 text-xs text-gray-700"></p>
                 </div>
                </div>
              </div>
            </div>
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p>Total Quantity :</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total Price :</p>
                <div className="">
                 <p className="mb-1 text-lg font-bold">
                    <span className="text-green-500">₹</span> {totalPrice}
                 </p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={handlePayment}>Check out</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-center items-center flex-col">
          <img src={emptyCartImage} className="w-full max-w-sm" />
          <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
          
        </div>
      )}

      <div>
      
      </div>
      
    </>

    
 );
};

export default Cart;
