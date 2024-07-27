import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import { FiUpload } from 'react-icons/fi';
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import { toast } from 'react-hot-toast';

const EditProduct = ({ productId }) => {
    EditProduct.propTypes = {
        productId: PropTypes.string.isRequired,
       };
 // Prop validation
 PropTypes.checkPropTypes({
    productId: PropTypes.string.isRequired,
 }, { productId }, 'prop', 'EditProduct');

 const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
 });

 useEffect(() => {
    if (!productId) return; // Exit early if productId is not defined

    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/products/${productId}`);
        const product = await response.json();
        setData(product);
      } catch (error) {
        console.error('Error fetching product details:', error);
        toast('Failed to fetch product details. Please try again later.');
      }
    };

    fetchProductDetails();
 }, [productId]);

 const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
 };

 const uploadImage = async (e) => {
    console.log("File selected:", e.target.files[0]);
    const data = await ImagetoBase64(e.target.files[0]);
    console.log("Base64 Image:", data);
    setData((prev) => ({
       ...prev,
       image: data,
    }));
   };
   

 const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, image, category, price, description } = data;

    if (name && image && category && price && description) {
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/products/${productId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast('Product updated successfully');
        // Redirect or update the state to reflect the changes
      } else {
        toast('Failed to update product. Please try again later.');
      }
    } else {
      toast('Please fill in all required fields');
    }
 };

 return (
    

    <div className='p-5'>
        {productId && <EditProduct productId={productId} />}
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type={"text"} name='name' className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name} />

        <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleOnChange} value={data.category}>
          <option value={"other"}>Select Category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetables"}>Vegetable</option>
          <option value={"icecream"}>Ice Cream</option>
          <option value={"rice"}>Rice</option>
          <option value={"paneer"}>Paneer</option>
          <option value={"colddrink"}>Cold Drink</option>
          <option value={"grocery"}>Grocery</option>
          <option value={"others"}>Other</option>
        </select>

        <label htmlFor='image'>Image</label>
        <div className='h-40 w-full bg-slate-300 rounded flex items-center justify-center cursor-pointer'>
          {data.image ? <img src={data.image} alt='' className='h-full' /> : <span className='text-5xl'><FiUpload /></span>}
          <input type={"file"} accept="image/*" id='image' onChange={uploadImage} className='hidden'/>
        </div>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type={"text"} className='bg-slate-200 p-1 my-1' name='price' onChange={handleOnChange} value={data.price} />

        <label htmlFor='description'>Description</label>
        <textarea rows={3} value={data.description} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleOnChange}></textarea>

        <button className='bg-green-500 hover:bg-green-600 text-white text-lg font-bold drop-shadow my-2'>Update</button>
      </form>     
    </div>
 );
}

export default EditProduct;
