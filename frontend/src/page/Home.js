import React, { useEffect, useRef, useState } from "react";
import bikeImage from "../assest/bike.png";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import CardFeatures from "../component/CardFeatures";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import FilterProduct from "../component/FilterProduct";
import AllProduct from "../component/AllProduct";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  
  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListVegitables = productData.filter(
    (el) => el.category === "vegetables",
    []
  );


  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeatures = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const previousProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-40 px-2 items-center rounded-full">
            <p className="text-l font-medium text-green-600">Bike Delivery</p>
            <img src={bikeImage} alt="loading.." className="h-8" />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fasted Delivery in{" "}
            <span className="text-green-600">Your Home</span>
          </h2>
          <p className="py-3 text-base">
            Welcome to <span className="text-green-600">Sanesh Store</span> ,
            your one-stop destination for fresh produce and grocery essentials
            delivered right to your doorstep! At{" "}
            <span className="text-green-600">Sanesh Store</span>, we're
            passionate about providing you with the highest quality fruits,
            vegetables, and pantry staples to make your meals healthy and
            delicious.
          </p>
          <button className="font-bold bg-green-500 text-slate-200 px-4 py-2 rounded-md">
            Order Now
          </button>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                    image={el.image}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return <HomeCard key={index+"loading"} loading={"Loading..."}  />;
              })}
        </div>
      </div>

      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-700 mb-4 mt-2">
            Fresh Vegetables
          </h2>

          <div className="ml-auto flex gap-4">
            <button
              onClick={previousProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrFormPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrFormNext />
            </button>
          </div>
        </div>

        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListVegitables[0]
            ? homeProductCartListVegitables.map((el) => {
                return (
                  <CardFeatures
                    key={el._id+"vegetables"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeatures.map((el,index) => (
                <CardFeatures loading="Loading..." key={index+"cartLoading"} />
              ))}
        </div>
      </div>

      <AllProduct heading={"Your Product"}  />
    </div>
  );
};

export default Home;
