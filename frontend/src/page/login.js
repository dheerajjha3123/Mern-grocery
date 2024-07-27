import React, { useState, useEffect } from 'react';
import loginSingupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice';

const Login = () => {
 const [showPassword, setShowPassword] = useState(false);
 const [data, setData] = useState({
    email: "",
    password: "",
 });
 const navigate = useNavigate();
 const userData = useSelector(state => state);

 const dispatch = useDispatch();

 useEffect(() => {
    console.log(userData);
 }, [userData]);

 const handleShowPassword = () => {
    setShowPassword(prev => !prev);
 };

 const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
 };

 const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!fetchData.ok) {
        toast('Login failed Password Not Matching:', fetchData.statusText);
        return;
      }

      const dataRes = await fetchData.json();
      console.log(dataRes);
      toast(dataRes.message);

      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } else {
      alert("Please Enter Required fields");
    }
 };

 return (
    <div className='p-3 md:p-5'>
      <div className='w-full max-w-sm bg-white m-auto flex-col p-4'>
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto'>
          <img src={loginSingupImage} alt='' className="w-full"/>
        </div>
        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input type={"email"} id="email" name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange}/>

          <label htmlFor='password'>Password</label>
          <div className='flex mt-1 mb-2 px-2 py-1 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-300'>
            <input type={showPassword ? "text" : "password"} id="password" name='password' className=' w-full bg-slate-200 border-none outline-none ' value={data.password} onChange={handleOnChange}/>
            <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
          </div>

          <button className='w-full max-w-[150px] m-auto bg-green-800 hover:bg-green-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Login</button>
        </form>
        <p className='text-left text-sm mt-2'>Don't have Account ?{" "}<Link to={"/singup"} className='text-green-700 underline'>Sing Up</Link></p>
      </div>
    </div>
 );
};

export default Login;
