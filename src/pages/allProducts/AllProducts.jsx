import React, { useContext, useEffect } from 'react'
import { useTitle } from '../../customHook/customHook'
import Filter from '../../components/filter/Filter'
import Layout from '../../components/layout/Layout'
import { MyContext } from '../../context/data/MyContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/CartSlice'
import { toast } from 'react-toastify'
import ProductCard from '../../components/productCard/ProductCard'

const AllProducts = () => {

  // const context = useContext(MyContext);
  // const {
  //   mode,
  //   getProducts,
  //   searchKey,
  //   setSearchKey,
  //   filterType,
  //   setFilterType,
  //   filterPrice,
  //   setFilterPrice,
  // } = context;

  // const dispatch = useDispatch();
  // const cartItems = useSelector((state) => state.cart);
  // console.log(cartItems);

  // Add to cart
  // const addCart = (product) => {
  //   dispatch(addToCart(product));
  //   toast.success("Product added to cart");
  // };

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cartItems));
  // }, [cartItems]);

  const title = useTitle()

  useEffect(()=>{
    title('Allproducts')
  },[])

  return (
    <Layout>
      <Filter/>
      <ProductCard/>
    </Layout>
  )
}

export default AllProducts
