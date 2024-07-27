import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';



const UserOrder = ({index}) => {
    const location = useLocation();
    const orderDetails = location.state?.orderDetails;
    const user = useSelector(state => state.user);
    const userId = user._id; // Assuming the user object has an _id property

    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state



    useEffect(() => {
      const fetchOrders = async () => {
        if (!userId) {
           setError('User ID is undefined. Please log in.');
           return;
        }
        try {
           setLoading(true);
           const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/orders?userId=${userId}`);
           if (!response.ok) {
             throw new Error('Failed to fetch orders');
           }
           const data = await response.json();
           const ordersWithProductDetails = await Promise.all(data.map(async (order) => {
             const itemsWithDetails = await Promise.all(order.items.map(async (item) => {
               try {
                 const productResponse = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/products/${item.productId}`);
                 if (!productResponse.ok) {
                   throw new Error(`Failed to fetch product details for product ID: ${item.productId}`);
                 }
                 const productDetails = await productResponse.json();
                 return { ...item, image: productDetails.image, name: productDetails.name };
               } catch (error) {
                 console.error(error);
                 // Fallback to a placeholder image and name
                 return { ...item, image: 'placeholder-image-url', name: 'Unknown Product' };
               }
             }));
             return { ...order, items: itemsWithDetails };
           }));
           setOrders(ordersWithProductDetails);
           setLoading(false);
        } catch (error) {
           setError('Failed to fetch orders');
           setLoading(false);
        }
       };
       
     
      fetchOrders();
     }, [userId]);
     
   
    if (error) {
       return <div>Error: {error.message}</div>;
    }
   
    if (loading) {
       return <div>Loading orders...</div>; // Display loading message
    }

    return (
      <div>
        <h1 className="text-center text-4xl my-5 font-bold tracking-tight text-gray-900">
          Your Orders
        </h1>
        <div>
 <div>
    <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
    {orders.map((order) => (
 <div key={order._id}>
    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <h1>Order ID. {order._id}</h1>
      <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
        Order Status: {order.status}
      </h3>
      <div className="flow-root">
        <ul className="-my-6 divide-y divide-gray-200">
          {order.items.map((item) => (
            <li key={item._id} className="flex py-6">
              <div>
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg mr-4" />
                <span>{item.name}</span>
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <span>Quantity: {item.quantity} - Total: ₹{item.price * item.quantity}</span>
              </div>
            </li>
          ))}
          </ul>
          
          
        </div>
    </div>
    
    <p>Order Date: {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    <p className=''>Payment Method: {order.paymentMethod}</p>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>₹{order.totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Order Items</p>
              <p>{order.items.length} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping Address:
            </p>
            <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
              <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                 <p className="text-sm font-semibold leading-6 text-gray-900"><span className="text-sm leading-6 text-gray-600">Name : </span>
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                 </p>
                 <p className="mt-1 truncate text-xs leading-5 text-gray-500"><span className="text-sm leading-6 text-gray-900">Address: </span>
                    {order.shippingAddress.address}
                 </p>
                 <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                 </p>
                 
                <p className='text-sm leading-6 text-gray-600'><span className="text-sm leading-6 text-gray-900">Mobile No : </span>  
                  {order.shippingAddress.mobile}
                </p>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
               
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
 </div>
</div>


      </div>
      
    );
};

export default UserOrder;
