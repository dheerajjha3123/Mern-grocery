import React from 'react'
import {useDispatch} from "react-redux"
import { Link } from 'react-router-dom'
import { addCartItem } from '../redux/productSlice'

const CardFeatures = ({image,name,price,category,loading,id}) => {

  const dispatch = useDispatch()
  const handleAddCartProduct =(e)=>{
    
    
    dispatch(addCartItem({
      _id : id,
      name : name,
      price : price,
      category : category,
      image : image
    }))
   

  }
  return (
    <div  className='w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 sm:py-5 sm:px-4 cursor-pointer flex flex-col'>
        {
          image ? <>

          <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0", behavior:"smooth"})}>

       <div className='h-28 flex flex-col justify-center items-center'>
            <img src={image} alt='Loading..' className='h-full' />
        </div>

         <p className=" text-slate-600 font-medium capitalize mt-3 ">
            {category}
          </p>

        <h3 className="font-semibold text-slate-900  capitalize text-sm font-bold whitespace-nowrap overflow-hidden">
            {name}
          </h3>
          <p className="font-bold">
            <span className="text-green-500">₹</span>
            <span>{price}</span>
          </p>

          </Link>

          <button className='bg-green-500 py-1 mt-2 rounded hover:bg-green-600 w-full' onClick={handleAddCartProduct}>Add Cart</button>
            
          

          </>

          : 
          <div className='min-h-[150px] flex justify-center items-center'>
            <p>{loading}</p>
          </div>
        }
        
        
    </div>
    
  )
}

export default CardFeatures