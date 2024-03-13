import React, { useEffect } from 'react'
import { useTitle } from '../../customHook/customHook'

const AllProducts = () => {

  const title = useTitle()

  useEffect(()=>{
    title('Allproducts')
  },[])

  return (
    <div>
      AllProducts
    </div>
  )
}

export default AllProducts
