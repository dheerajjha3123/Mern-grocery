import React, { useEffect, useState } from 'react'
import FilterProduct from './FilterProduct'
import CardFeatures from './CardFeatures'
import {useSelector} from 'react-redux'

const AllProduct = ({heading}) => {

    const productData = useSelector((state)=>state.product.productList)

    const categoryList = [...new Set(productData.map(el=>el.category))]
    

    // For filter Data Display
  const [filterBy, setfilterBy] = useState("")
  const [dataFilter,setDataFilter] = useState([])

  useEffect(()=>{
       setDataFilter(productData)
  },[productData])
  

  const handleFilterProduct = (category)=>{
    const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase())
    setDataFilter(()=>{
      return[
            ...filter
      ]
    })

  }

  // For using Loading 
  const loadingArrayFeatures = new Array(10).fill(null)


  return (
    <div className='my-5'>
    <h2 className='font-bold text-2xl text-slate-700 mb-4 mt-2'>{heading}</h2>

    <div className='flex gap-4 justify-center overflow-scroll scrollbar-none '>

     {
       categoryList[0] ? categoryList.map(el =>{
         return(
           <FilterProduct 
           category={el} 
           key={el} onClick={()=> handleFilterProduct(el)} />

         )

       })
       : 
       <div className='min-h-[150px] flex justify-center items-center'>
            <p>Loading...</p>
          </div>
     }          
  </div>

  <div className='flex flex-wrap justify-center gap-4 my-5'>

   {
     dataFilter[0] ? dataFilter.map(el =>{
       return(
         <CardFeatures
             key={el._id}
             id={el._id}  
             image={el.image}
             name={el.name}
             price={el.price}
             category={el.category}
         />
       )
     })
     :
     loadingArrayFeatures.map((el,index) => (
      <CardFeatures loading="Loading..." key={index+"allProduct"} />
    ))}

   
  </div>


   </div>
  )
}

export default AllProduct