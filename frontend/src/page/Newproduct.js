import React, { useState } from 'react'
import {FiUpload} from 'react-icons/fi'
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import { toast } from 'react-hot-toast'

const Newproduct = () => {

  const[data,setData]= useState({
    name : "",
    category : "",
    image : "",
    price : "",
    description : "",
    
  })

  const handleOnChange = (e)=>{
    const {name,value} = e.target

    setData((preve)=>{
      return {
        ...preve,
        [name] : value
      }

    })


  }

  const uploadImage= async(e)=>{
    console.log(e.files)
    const data = await ImagetoBase64(e.target.files[0])
    //console.log(data)

    setData((preve)=>{
      return{
        ...preve,
        image : data
      }
    })

  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log("Data before submission:", data) // Debugging line

    const{name,image,category,price} = data

    if(name && image && category && price){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body :JSON.stringify(data)
      })
  
      const fetchRes = await fetchData.json()
  
      console.log(fetchRes)
      toast(fetchRes.message)

      setData(()=>{
        return{
          name : "",
          category : "",
          image : "",
          price : "",
          description : "",
          
        }
        
      })     
      
    }
    else{
      toast("Enter Reqiured Feilds")
    }

    
  }

  return (
    <div className='p-5'>
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
      
      <label htmlFor='image'>Image

      <div className='h-40 w-full bg-slate-300  rounded flex items-center justify-center cursor-pointer'>
      
      {
        data.image ? <img src={data.image} alt='' className='h-full' /> : <span className='text-5xl'><FiUpload /></span> 
      }
      
      
      
      <input type={"file"} accept="image/*" id='image' onChange={uploadImage} className='hidden'/>

      </div>
      </label>

      

      <label htmlFor='price' className='my-1'>Price</label>
      <input type={"text"} className='bg-slate-200 p-1 my-1' name='price' onChange={handleOnChange} value={data.price} />

      <label htmlFor='description'>Description</label>
      <textarea rows={3} value={data.description} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleOnChange}></textarea>

      <button className='bg-green-500 hover:bg-green-600 text-white text-lg font-bold drop-shadow my-2'>Save</button>

      </form>     

    </div>
  )
}

export default Newproduct