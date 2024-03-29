import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/CartSlice'
import { useEffect } from 'react'
import { useTitle } from '../../customHook/customHook'

const Home = () => {
  const title = useTitle()

  useEffect(()=>{
    title('Home')
  },[])

  const dispatch = useDispatch();
  const cardItem = useSelector((state)=> state.cart) 

  // console.log(cardItem);

  const addCart = () => {
    dispatch(addToCart("shirt"));
  }

  const deleteCart = () => {
    dispatch(deleteFromCart("shirt"));
  }

  return (
    <Layout>
      <HeroSection/>
      <Filter/>
      <ProductCard/>
      <Track/>
      <Testimonial/>
    </Layout>
  )
}

export default Home
