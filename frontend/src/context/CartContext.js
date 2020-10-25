import React, { createContext, useState } from "react"

export const CartContext = createContext(null)

export default ({ children }) => {

  const [cart, setCart] = useState([])
  const [shippingAddress, setShippingAddress] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)
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
      let existItem = await cart?.find(x => x.product === item.product)
      if(existItem) {
        setCart(cart.map(x => x.product === existItem.product ? item : x))
      } else {
        setCart([...cart, item])
      }
      localStorage.setItem('cartItems', JSON.stringify(cart))
      setLoadingAddToCart(false)
      console.log("cart", cart)
    } catch(err) {
      setErrorAddToCart(err)
      console.log("ERROR_ADDTOCART", err)
    }
  }

  const removeFromCart = async (id) => {
    setCart(cart.filter(({product}) => product !== id))
    localStorage.setItem('cartItems', JSON.stringify(cart))
  }

  return (
    <CartContext.Provider value={{ 
      addToCart,
      cart,
      cartItem,
      errorAddToCart,
      loadingAddToCart,
      paymentMethod,
      removeFromCart,
      setPaymentMethod,
      setShippingAddress,
      shippingAddress 
    }}>
      {children}
    </CartContext.Provider>
  )
};