import React from 'react';
import { useLocation } from 'react-router-dom';

const Order = () => {
 const location = useLocation();
 const orderDetails = location.state?.orderDetails;

 // Check if orderDetails is available
 if (!orderDetails) {
    return <div>No order details found.</div>;
 }
 // Debugging: Log the orderDetails object
 //console.log(orderDetails);

 return (
    <div>
      <section className="py-24 relative">
        <div className="w-full max-w-8xl px-4 md:px-5 lg:6 mx-auto">
          <h1 className="text-center font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-11">
            Your Order Place Successfully
          </h1>
          <p className="text-center font-normal text-lg leading-8 text-gray-500 mb-11">
            Your order has been completed and will be delivered soon.
          </p>
          <p className="text-center justify-center text-xl text-green-500 font-bold">Your Order ID: {orderDetails.orderId}</p>
          <div className="text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 py-6 border-y border-gray-100 mb-6">
            
            {/*<p className="text-center justify-center">User ID: {orderDetails.userId}</p>
            <p className="text-center justify-center">Total Amount: ₹{orderDetails.totalAmount}</p>
            <p className="text-center justify-center">Payment Method: {orderDetails.paymentMethod}</p>
          </div>
          <div>
            <h3 className="text-center font-bold text-xl leading-10 text-black mb-6">
              Shipping Address
            </h3>
            <p className="text-center font-normal text-lg leading-8 text-gray-500 mb-11">
              {orderDetails.shippingAddress.firstName} {orderDetails.shippingAddress.lastName}<br />
              {orderDetails.shippingAddress.email}<br />
              {orderDetails.shippingAddress.mobile}<br />
              {orderDetails.shippingAddress.address}, {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}, {orderDetails.shippingAddress.zip}
            </p>
          </div>
          <div>
            <h3 className="text-center font-bold text-xl leading-10 text-black mb-6">
              Order Items
            </h3>
            <ul className="text-center font-normal text-lg leading-8 text-gray-500 mb-11">
              {orderDetails.items.map((item, index) => (
                <li key={index}>
                 {item.productId} - Quantity: {item.quantity} - Total: ₹{item.price * item.quantity}
                </li>
              ))}
            </ul>
          </div>
            <div> 
 <h3 className="text-center font-bold text-xl leading-10 text-black mb-6">
    Order Items
 </h3>
 <ul className="text-center font-normal text-lg leading-8 text-gray-500 mb-11">
    {orderDetails.items.map((item, index) => (
      <li key={index}>
        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg mr-4" />
        {item.name} - Quantity: {item.quantity} - Total: ₹{item.price * item.quantity}
      </li>
    ))}
 </ul>*/}
</div>

        </div>
      </section>
    </div>
 );
};

export default Order;
