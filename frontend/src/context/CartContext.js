import React, { createContext, useState } from "react"
import axios from "axios"

export const CartContext = createContext(null)

export default ({ children }) => {
  const config_header = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const [errorLoginUser, setErrorLoginUser] = useState(null)
  const [errorRegisterUser, setErrorRegisterUser] = useState(null)

  const [LoadingAdToCart, setLoadingAdToCart] = useState(false)
  const [loadingRegisterUser, setLoadingRegisterUser] = useState(false)

  const [cart, setCart] = useState(null)

  const addToCart = async (id, qty) => {
    try {
      setLoadingAdToCart(true)
      let response = await fetch(`/api/products/${id}`)
      let data = await response.json()
      let item = {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock
      }
      setProducts(data.products)
      setPages(data.pages)
      setPage(data.page)
      setLoadingProducts(false)
    } catch(err) {
      setErrorProducts(err)
      console.log("ERROR_GET_PRODUCT", err)
    }
  }

  const register = async (credentials) => {
    try {
      !errorRegisterUser && setErrorRegisterUser(null)
      setLoadingRegisterUser(true)
      let res = await axios.post(
        `/api/users`, 
        credentials, 
        config_header
      )
      let {data, type} = await res.data
      switch(type) {
        case 'success':
          setLoadingRegisterUser(false)
          localStorage.setItem('user', data)
          setUser(data)
          break
        case 'error':
          setLoadingRegisterUser(false)
          setErrorRegisterUser(data)
          setTimeout(() => {
            !errorRegisterUser && setErrorRegisterUser(null)
          }, 4500)
          break
        default:
          setErrorRegisterUser("Error_Post_Login")
      }
    } catch(err) {
      // setErrorRegisterUser(err)
      console.log("ERROR_REGISTER", err)
    }
  }

  return (
    <CartContext.Provider value={{ 
      errorLoginUser,
      errorRegisterUser,
      loadingLoginUser,
      loadingRegisterUser,
      login,
      setUser, 
      user,
      register 
    }}>
      {children}
    </CartContext.Provider>
  )
};