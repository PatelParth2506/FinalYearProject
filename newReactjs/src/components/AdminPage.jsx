import axios from 'axios';
import React, { useEffect, useState } from 'react'

function AdminPage({user}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = async()=>{
      const res=await axios.get(`/api/product/getBusinessProduct`,{
        withCredentials:true
      })
      setProducts(res.data.data)
      console.log(res.data.data)
    }
    storedProducts()
  }, []);

  return (
    <div className='w-full h-[88vh] bg-gray-900 mt-3'>
      <div className="w-full h-full flex justify-start items-center flex-col gap-5 p-5">
        <div className="w-[90%] bg-gray-100 rounded flex justify-evenly items-center text-[17px] text-gray-900 py-3"> 
          <p className='w-[20%] h-[auto] text-center'>Title</p>
          <p className='w-[20%] h-[auto] text-center'>Price</p>
          <p className='w-[20%] h-[auto] text-center'>Category</p>
          <p className='w-[20%] h-[auto] text-center'>Description</p>
          <p className='w-[20%] h-[auto] text-center'>Image</p>
        </div>
        <div id="overflow" className="overFlow w-full h-[100%] flex justify-start items-center flex-col gap-5 overflow-auto">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="w-[90%] h-auto py-5 rounded-2xl border-2 space-x-3 border-gray-100 flex justify-evenly items-center text-[16px] text-white">
                <p className='w-[20%] text-center overflow-auto overFlow text-[17px]'>{product.description.substring(0,20)}</p>
                <p className='w-[20%] text-center overflow-auto overFlow text-[17px]'>${product.price}</p>
                <p className='w-[20%] text-center overflow-auto overFlow text-[17px]'>{product.category}</p>
                <p className='w-[20%] text-center overflow-auto overFlow text-[17px]'>{product.description}</p>
                <div className='w-[20%] text-center overflow-auto overFlow text-[16px] flex justify-center items-center'>
                  {product.photo && <img src={product.photo} alt="Product" className='w-24 h-24 bg-gray-700 rounded-2xl' />}
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center text-2xl mt-10">No products available.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPage