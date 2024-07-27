import React, { useEffect, useState } from 'react';

const AdminOrdes = () => {
    const [orders, setOrders] = useState([]);

    const fetchProductDetails = async (productId) => {
       try {
          const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/products/${productId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch product details');
          }
          const productDetails = await response.json();
          return productDetails;
       } catch (error) {
          console.error('Failed to fetch product details:', error);
          return null;
       }
      };
   
    useEffect(() => {
       const fetchOrders = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/orders`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
              throw new TypeError(`Expected content type application/json, but received: ${contentType}`);
            }
            const data = await response.json();
            if (Array.isArray(data)) {
              const ordersWithProductDetails = await Promise.all(data.map(async (order) => {
                const itemsWithDetails = await Promise.all(order.items.map(async (item) => {
                   const productDetails = await fetchProductDetails(item.productId);
                   return { ...item, image: productDetails.image, name: productDetails.name };
                }));
                return { ...order, items: itemsWithDetails };
              }));
              setOrders(ordersWithProductDetails);
            } else {
              console.error('Expected an array of orders, but received:', data);
            }
          } catch (error) {
            console.error('Failed to fetch orders:', error);
          }
       };
   
       fetchOrders();
      }, []);
   
    const handleStatusChange = async(orderId, status) => {
        console.log(`Updating order status to: ${status}`); // Debugging line
       try {
           const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/update-order-status/${orderId}`, {
               method: 'PUT',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({ status }),
           });
           if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to update order status:', errorData);
           throw new Error('Failed to update order status');
           }
           setOrders(orders.map(order => order._id === orderId ? { ...order, status } : order));
       } catch (error) {
           console.error('Failed to update order status:', error);
       }
    };
 return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                 <th className="py-3 px-0 text-left cursor-pointer">Order#</th>
                 <th className="py-3 px-0 text-left">Items</th>
                 <th className="py-3 px-0 text-left cursor-pointer">Total Amount</th>
                 <th className="py-3 px-0 text-center">Shipping Address</th>
                 <th className="py-3 px-0 text-center">Order Status</th>
                 <th className="py-3 px-0 text-center">Payment Method</th>
                 <th className="py-3 px-0 text-center">Payment Status</th>
                 <th className="py-3 px-0 text-left cursor-pointer">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                 <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-0 text-left whitespace-nowrap">{order._id}</td>
                    <td className="py-3 px-0 text-left">
                      {order.items.map((item) => (
                        <div key={item._id} className="flex items-center">
                          <div className="mr-2">
                            <img className="w-6 h-6 rounded-full" src={item.image} alt={item.name} />
                          </div>
                          <span>{item.name} - ₹{item.price}</span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-0 text-center">₹{order.totalAmount}</td>
                    <td className="py-3 px-0 text-center">
                      {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />{order.shippingAddress.mobile} <br/>
                      {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                    </td>
                    <td className="py-3 px-0 text-center">
                      <select onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3 px-0 text-center">{order.paymentMethod}</td>
                    <td className="py-3 px-0 text-center">
                      <select>
                        <option value="pending">Pending</option>
                        <option value="received">Received</option>
                      </select>
                    </td>
                    <td className="py-3 px-0 text-center">
                      {/* Implement actions like edit, delete, etc. */}
                    </td>
                 </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
 );
};

export default AdminOrdes;
