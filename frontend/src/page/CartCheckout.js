import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


function CartCheckout() {
 const [paymentMethod, setPaymentMethod] = useState("cod");
 const [error, setError] = useState(null); // State to track error messages
 const [validationMessages, setValidationMessages] = useState({}); // State for validation messages

 const location = useLocation();
 const cartItems = location.state?.cartItems || [];
 const subtotal = cartItems.reduce(
    (acc, item) => acc + parseInt(item.total),
    0
 );
 const user = useSelector(state => state.user._id);
 //console.log(user)



 const validateForm = () => {
  const messages = {};
  if (!document.getElementById('first_name').value) {
    messages.firstName = 'First Name is required';
  }
  if (!document.getElementById('last_name').value) {
    messages.lastName = 'Last Name is required';
  }
  if (!document.getElementById('email').value) {
    messages.email = 'Email is required';
  }
  if (!document.getElementById('mobile').value) {
    messages.mobile = 'Mobile Number is required';
  }
  if (!document.getElementById('address').value) {
    messages.address = 'Address is required';
  }
  if (!document.getElementById('city').value) {
    messages.city = 'City is required';
  }
  if (!document.getElementById('state').value) {
    messages.state = 'State is required';
  }
  if (!document.getElementById('zip').value) {
    messages.zip = 'ZIP Code is required';
  }
  setValidationMessages(messages);
  return Object.keys(messages).length === 0; // Return true if no errors
};

const orderId = uuidv4();

const navigate = useNavigate(); 
 const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return; // Prevent form submission if validation fails
    }

    if (paymentMethod === "online") {
      // Construct the PhonePe payment URL
      // Note: This is a hypothetical example. You'll need to refer to PhonePe's documentation for the correct URL structure and parameters.
      const phonePeUrl = `https://www.phonepe.com/pay?amount=${subtotal}&orderId=${orderId}&userId=${user}`;
  
      // Redirect the user to the PhonePe payment gateway
      window.location.href = phonePeUrl;
      return;
   }
    

    const formData = {
      orderId: orderId,
      userId: user, // Use actual user ID from Redux state
      items: cartItems.map(item => ({
        name: item.name, // Include the product name
       image: item.image, // Include the product image
        productId: item._id,
        quantity: item.qty,
        price: item.price,
      })),
      totalAmount: subtotal,
      paymentMethod: paymentMethod,
      shippingAddress: {
        firstName: document.getElementById('first_name').value,
        lastName: document.getElementById('last_name').value,
        email: document.getElementById('email').value,
        mobile: document.getElementById('mobile').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
      },
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/create-order`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Server error response:', errorResponse);

        throw new Error('Failed to create order');
      }

      const responseRes = await response.json();
      const orderIdFromApi = responseRes.order._id;
      navigate('/ordersucces', { state: { orderDetails: { ...formData, orderId: orderIdFromApi } } });
      
      console.log('Order created successfully:', responseRes);
      // Redirect to a success page or show a success message
    } catch (error) {
      console.error('Error creating order:', error);
      if (error instanceof SyntaxError) {
         console.error('Error parsing response:', error);
      } else if (error.response) {
         // The request was made and the server responded with a status code
         // that falls out of the range of 2xx
         console.error('Server response:', error.response.responseRes);
      } else if (error.request) {
         // The request was made but no response was received
         console.error('No response received:', error.request);
      } else {
         // Something happened in setting up the request that triggered an Error
         console.error('Error', error.message);
      }
      setError('Failed to create order. Please try again.');
     }
 };
 


 

 const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
 };

  return (
    <div>
      <div className="bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-3xl mx-auto p-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              Checkout
            </h1>

            <div></div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" required
                  />
                  {validationMessages.firstName && <p className="text-red-500 text-xs">{validationMessages.firstName}</p>}
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" required
                  />
                  {validationMessages.lastName && <p className="text-red-500 text-xs">{validationMessages.lastName}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" required
                />
                {validationMessages.email && <p className="text-red-500 text-xs">{validationMessages.email}</p>}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="mobile"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  Mobile No.
                </label>
                <input
                  type="number"
                  id="mobile"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" required
                />
                {validationMessages.mobile && <p className="text-red-500 text-xs">{validationMessages.mobile}</p>}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="address"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" required
                />
                {validationMessages.address && <p className="text-red-500 text-xs">{validationMessages.address}</p>}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="city"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" required
                />
                {validationMessages.city && <p className="text-red-500 text-xs">{validationMessages.city}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="state"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" required
                  />
                  {validationMessages.state && <p className="text-red-500 text-xs">{validationMessages.state}</p>}
                </div>
                <div>
                  <label
                    htmlFor="zip"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zip"
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" required
                  />
                  {validationMessages.state && <p className="text-red-500 text-xs">{validationMessages.state}</p>}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                Payment Method
              </h2>
              <div className="mt-4">
                <label
                  htmlFor="paymentMethod"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  Select Payment Method
                </label>
                <select
                  id="paymentMethod"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  onChange={handlePaymentMethodChange}
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="online">Online Payment</option>
                </select>
              </div>

            
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2 my-4">
                Your Items
              </h2>
              <ul>
                {cartItems.map((item) => (
                  <li key={item._id}>
                    {item.name} - Quantity: {item.qty} - Total: ₹{item.total}
                  </li>
                ))}
              </ul>
            </div>
            {cartItems.map((item) => {})}
            <div class="mt-6 border-t border-b py-2">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Total Quantity</p>
                <p class="font-semibold text-gray-900">
                  {cartItems.reduce((acc, item) => acc + parseInt(item.qty), 0)}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Shipping Charge</p>
                <p class="font-semibold text-gray-900">Free</p>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">₹{subtotal}</p>
            </div>

            <div className="mt-8 flex justify-end">
              <button onClick={handleSubmit} className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCheckout;
