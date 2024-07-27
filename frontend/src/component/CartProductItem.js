import React from "react";
import { TiMinus, TiPlus } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteCartItem, increaseQty, decreaseQty } from "../redux/productSlice";

const CartProductItem = ({ id, name, image, category, qty, total, price }) => {
 const dispatch = useDispatch();

 return (
    <div className="bg-slate-200 p-2 flex gap-4 rounded border border-slate-400 min-w-[150px]">
      <div className="bg-white p-3 rounded overflow-hidden">
        <img src={image} alt={name} className="w-40 h-28 " />
      </div>

      <div className="flex flex-col gap-1 w-full">
      <h3  className="font-semibold text-slate-900 capitalize text-lg md:text-1xl font-bold">{category}</h3>
        <div className="flex  justify-between">
          
          <p  className="text-slate-600 font-medium capitalize text-l">{name}</p>       
         
          

          <div className="ml-auto cursor-pointer text-slate-700 hover:text-red-500" onClick={() => dispatch(deleteCartItem(id))}>
            <MdDelete />
          </div>
        </div>

        <p className="font-bold md:text-l">Quantity: {qty}</p>

        <div className="flex justify-between w-full">
          <div className="flex gap-3 items-center">
            <button onClick={() => dispatch(increaseQty(id))} className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1">
              <TiPlus />
            </button>
            
            <button onClick={() => dispatch(decreaseQty(id))} className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1">
              <TiMinus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <p>Total :</p>
            <p><span className="text-green-500">₹</span>{total}</p>
          </div>
        </div>
      </div>
    </div>
 );
};

export default CartProductItem;
