import React from "react";
import { Link } from "react-router-dom";

function HomeCard({ name, image, category, price, loading, id, discountPrice }) {
 return (
    <div className="bg-white shadow-md p-2 rounded min-w-[150px]">
      {name ? (
        <>
          <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0", behavior:"smooth"})}>
            <div className="w-40 min-h-[150px]">
              <img src={image} alt="" className="h-full w-full" />
            </div>

            <p className="text-center text-slate-600 font-medium capitalize ">
              {category}
            </p>
            <h3 className="font-semibold text-slate-900 text-center capitalize text-lg font-bold ">
              {name}
            </h3>
            {discountPrice && (
              <p className="text-center font-bold">
                <span className="text-green-500">₹</span>
                <span>{discountPrice}</span>
              </p>
            )}
            <p className="text-center font-bold">
              <span className="text-green-500">₹</span>
              <span>{price}</span>
            </p>
          </Link>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>{loading}</p>
        </div>
      )}
    </div>
 );
}

export default HomeCard;
