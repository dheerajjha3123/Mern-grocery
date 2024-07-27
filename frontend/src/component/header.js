import React, { useState } from "react";
import logo from "../assest/San3.png";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";


const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state)=>state.user)
  console.log(userData.email)
  const dispatch = useDispatch()

  const handleShowMenu =()=>{
    setShowMenu(preve => !preve)
  }

  const handleLogout=()=>{
    dispatch(logoutRedux())
    toast("Logout Successfully")

  }

  const cartItemNumber = useSelector((state)=>state.product.cartItem)

  

  return (
    <header className="fixed shadow-md w-full h-18 px-2 md:px-4 z-50 bg-white">
      {/* Desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-14">
            <img src={logo} alt="" className="h-full" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="flex gap-4 md:gap-7 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            <Link to={"menu/6613e745e4316c1acb105c09"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-3xl  text-slate-600 relative">

            <Link to={"cart"}>
            <MdShoppingCart />
            <div className="absolute -top-2 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
              {cartItemNumber.length}
            </div>
            </Link>
            
          </div>
          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer h-8 w-8 rounded-full overflow-hidden drop-shadow" >
              

              {userData.image ?<img src={userData.image} alt="" className="h-full w-full" /> :
               <FaCircleUser />

              }
             
             
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
              
              {
                userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <>
                <Link to={"newproduct"} className="whitespace-nowrap cursor-pointer px-2">New Product</Link>
                <Link to={"allProduct"} className="whitespace-nowrap cursor-pointer px-2">All Product</Link>
                <Link to={"adminOrder"} className="whitespace-nowrap cursor-pointer px-2">Orders</Link>

                </>

              )}

                

                {
                  userData.email ? (
                    <>
                    {userData.email !== process.env.REACT_APP_ADMIN_EMAIL && (
                    <Link to={"userOrder"} className="whitespace-nowrap cursor-pointer px-2">Orders</Link>
                    )}
                    <p className="cursor-pointer px-2" onClick={handleLogout}>Logout ({userData.firstName})</p>
                    </> ) :
                  <Link to={"login"} className="whitespace-nowrap cursor-pointer px-2">Login</Link>

                }
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                 <Link to={""} className="px-2 py-1">Home</Link>
                 <Link to={"menu/6613e745e4316c1acb105c09"} className="px-2 py-1">Menu</Link>
                 <Link to={"about"} className="px-2 py-1">About</Link>
                 <Link to={"contact"} className="px-2 py-1">Contact</Link>
               </nav>

              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
    </header>
  );
};

export default Header;
