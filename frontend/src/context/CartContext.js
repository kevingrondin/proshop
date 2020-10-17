import React, { createContext, useState } from "react"

export const CartContext = createContext(null)

export default ({ children }) => {

  const [cart, setCart] = useState([])
  const [cartItem, setCartItem] = useState(null)
  const [errorAddToCart, setErrorAddToCart] = useState(false)
  const [loadingAddToCart, setLoadingAddToCart] = useState(false)


  const addToCart = async (id, qty) => {
    try {
      setLoadingAddToCart(true)
      let response = await fetch(`/api/products/${id}`)
      let data = await response.json()
      let item = await {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty
      }
      await setCartItem(item)
      const existItem = await cart?.find(x => x.product === item.product)
      if(existItem) {
        cart.map(x => x.product === existItem.product ? item : x)
        console.log(cart)
      } else {
        setCart([...cart, item])
      }
      localStorage.setItem('cartItems', JSON.stringify(cart))
      setLoadingAddToCart(false)
    } catch(err) {
      setErrorAddToCart(err)
      console.log("ERROR_ADDTOCART", err)
    }
  }

  return (
    <CartContext.Provider value={{ 
      addToCart,
      cart,
      cartItem,
      errorAddToCart,
      loadingAddToCart 
    }}>
      {children}
    </CartContext.Provider>
  )
};