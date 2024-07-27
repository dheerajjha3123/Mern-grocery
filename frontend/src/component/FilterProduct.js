import React from 'react';
import {  GiFruitBowl,GiButter  } from "react-icons/gi";
import {FaBowlRice,FaIceCream  } from "react-icons/fa6";
import {LiaGlassMartiniAltSolid } from "react-icons/lia";
import {IoStorefrontSharp } from "react-icons/io5"

const FilterProduct = ({ category ,onClick}) => {
 // Mapping categories to their corresponding icons
 const categoryIcons = {
    "fruits": <GiFruitBowl  />,
    "vegetables": <GiFruitBowl  />,
    "rice": <FaBowlRice   />,
    "icecream": <FaIceCream  />,
    "paneer": <GiButter  />,
    "colddrink": <LiaGlassMartiniAltSolid />,
    "grocery": <IoStorefrontSharp  />,
    
    
 };

 
 

 // Select the icon based on the category
 const Icon = categoryIcons[category] 

 return (
    <div onClick={onClick} >
      <div className='text-3xl p-4 bg-green-500 rounded-full cursor-pointer'>
        {Icon}
      </div>
      <p className='text-center font-medium my-1 capitalize '>{category}</p>
    </div>
 );
};

export default FilterProduct;
