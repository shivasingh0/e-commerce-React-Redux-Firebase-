import React, { useContext } from 'react'
import { MyContext } from '../../context/data/MyContext'

const Order = () => {
  const context = useContext(MyContext)
  const {name} = context
  return (
    <div>
      Order
      <h1>Name: {name} </h1>
    </div>
  )
}

export default Order
