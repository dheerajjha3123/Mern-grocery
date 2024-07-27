import React, { useState, useEffect } from 'react';

const AdminAllProduct = () => {
 const [products, setProducts] = useState([]);
 const [error, setError] = useState(null); // State to handle errors

 useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
      }
    };

    fetchProducts();
 }, []);

 // Delete Function
 const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(`Failed to delete product: ${responseText}`);
    }

    // Filter out the deleted product from the products list
    const updatedProducts = products.filter(product => product._id!== productId);
    setProducts(updatedProducts);
  } catch (error) {
    console.error('Error deleting product:', error);
    setError('Failed to delete product. Please try again later.');
  }
};


 return (
    <div className="overflow-x-auto">
      {error && <div className="bg-red-500 text-white p-4">{error}</div>}
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                 <th className="py-3 px-0 text-center cursor-pointer">Product ID</th>
                 <th className="py-3 px-0 text-center">Product Name</th>
                 <th className="py-3 px-0 text-center">Category</th>
                 <th className="py-3 px-0 text-center">Price</th>
                 <th className="py-3 px-0 text-center">Image</th>
                 <th className="py-3 px-0 text-center">Description</th>
                 <th className="py-3 px-0 text-center cursor-pointer">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {products.map((product) => (
                 <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-0 text-center whitespace-nowrap">{product._id}</td>
                    <td className="py-3 px-0 text-center">{product.name}</td>
                    <td className="py-3 px-0 text-center">{product.category}</td>
                    <td className="py-3 px-0 text-center">₹{product.price}</td>
                    <td className="py-3 px-0 text-center">
                      {product.image && (
                        <img className="w-6 h-6 rounded-full" src={product.image} alt={product.name} />
                      )}
                    </td>
                    <td className="py-3 px-0 text-left">{product.description}</td>
                    <div className='flex gap-4'>
                    <button  className=" py-1 px-1 mt-2 text-center text-black bg-green-400 rounded hover:bg-green-600">Edit </button >
                    <button onClick={() => deleteProduct(product._id)}  className="py-1 px-1 mt-2 text-center text-black bg-red-400 rounded hover:bg-red-600">Delete</button >
                    </div>
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

export default AdminAllProduct;
