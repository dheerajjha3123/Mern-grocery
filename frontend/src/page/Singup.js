import React, { useState } from 'react'
import loginSingupImage from "../assest/login-animation.gif"
import{BiShow,BiHide} from "react-icons/bi";
import { Link ,useNavigate} from "react-router-dom";
import { ImagetoBase64 } from '../utility/ImagetoBase64'; 
import { toast } from 'react-hot-toast';


function Singup () {
  const navigate = useNavigate()
  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmPassword,setShowConfirmPassword]=useState(false)
  const[data,setData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    mobile : "",
    password : "",
    confirmpassword : "",
    image : ""
  });
  console.log(data)

  const handleShowPassword = ()=>{
    setShowPassword(preve => !preve)    
  };
  const handleShowConfirmPassword =()=>{
    setShowConfirmPassword(preve => !preve)
  };
  const handleOnChange = (e)=>{
    const {name,value} = e.target
    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })

  }

  const handleUploadProfileImage = async(e)=>{
      const data = await ImagetoBase64(e.target.files[0])
    console.log(data)

    setData((preve)=>{
      return{
        ...preve,
        image : data
      }
    })

  }

  console.log(process.env.REACT_APP_SERVER_DOMAIN)
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {firstName,email,password,confirmpassword} =data
    if(firstName && email && password && confirmpassword){
      if(password === confirmpassword){
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/singup`,{
          method : "POST",
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
        
        const dataRes = await fetchData.json()
        console.log(dataRes)
        //alert(dataRes.message);
        toast(dataRes.message)
        if(dataRes.alert){
          navigate("/login");
        }
        
      }
      else{
        alert("Password and Confirm Password not Match")
      }
    }
    else{
      alert("Please Enter Required fields")
    }

  }
  
  return (
    <div className='p-3 md:p-5'>
        <div className='w-full max-w-sm bg-white m-auto flex-col p-4'>
            {/*<h1 className='text-center text-2xl font-bold'>Sing Up</h1> */}
            <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
                <img src={data.image ? data.image : loginSingupImage} alt='' className="w-full h-full"/>

                <label htmlFor='profileImage'>
                <div className='absolute bottom-0 h-1/3 bg-slate-900 bg-opacity-15 w-full text-center cursor-pointer'>
                  <p className='text-sm p-1 text-white'>Upload</p>
                </div>
                <input type={"file"} id="profileImage" accept='image/*' className='hidden' onChange={handleUploadProfileImage}></input>
                </label>
            </div>
            <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}> 
                <label htmlFor='firstName'>First Name</label>
                <input type={"text"} id="firstName" name="firstName" className='mt-1 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.firstName} onChange={handleOnChange}/>

                <label htmlFor='lastName'>Last Name</label>
                <input type={"text"} id="lastName" name="lastName" className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'value={data.lastName} onChange={handleOnChange}/>

                <label htmlFor='lastName'>Mobile No</label>
                <input type={"number"} id="mobile" name="mobile" className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'value={data.mobile} onChange={handleOnChange}/>

                <label htmlFor='email' >Email</label>
                <input type={"email"} id="email" name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange}/>

                <label htmlFor='password'>Password</label>
                <div className='flex mt-1 mb-2 px-2 py-1 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-300'>
                <input type={showPassword ? "text":"password"} id="password" name='password' className=' w-full bg-slate-200 border-none outline-none ' value={data.password} onChange={handleOnChange}/>
                <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
                </div>

                <label htmlFor='confirmpassword'>Confirm Password</label>
                <div className='flex mt-1 mb-2 px-2 py-1 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-300'>
                <input type={showConfirmPassword ? "text":"password"} id="confirmpassword" name='confirmpassword' className=' w-full bg-slate-200 border-none outline-none ' value={data.confirmpassword} onChange={handleOnChange}/>
                <span className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>{showConfirmPassword ? <BiShow /> : <BiHide />}</span>
                </div>

                <button className='w-full max-w-[150px] m-auto bg-green-800 hover:bg-green-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Sing Up</button>


            </form>
            <p className='text-left text-sm mt-2'>Already have Account ?{" "}<Link to={"/login"} className='text-green-700 underline'>Login</Link></p>

        </div>
    </div>
  )
}

export default Singup