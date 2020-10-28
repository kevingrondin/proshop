import React, { createContext, useState} from "react"
import axios from "axios"
import { CartContext } from "../context/CartContext"
import { UserContext } from "../context/UserContext"

export const OrderContext = createContext(null)

export default ({ children }) => {
  const { user } = useContext(UserContext)
  const { cart } = useContext(CartContext)

  const [ order , setOrder ] = useState({
    loading: false,
    sucess: true,
    data: null
  })

  const _setToken = () => {
    axios.defaults.headers["Content-Type"] = 'application/json'
    axios.defaults.headers["Authorization"] = `Bearer ${user.token}`
  } 

  const createOrder = async (data) => {
    try {
      await _setToken()
      setOrder({...order, loading: true})
      let {data} = await fetch('/api/orders/')
      setOrder({...order, data})
      setOrder({...order, loading: false})
    } catch(err) {
      setErrorProductDetail(err)
      console.log("ERROR_GET_PRODUCTDETAIL", err)
    }
  }

  const getProducts = async (keyword = '', pageNumber = '') => {
    try {
      setLoadingProducts(true)
      let response = await fetch(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
      let data = await response.json()
      setProducts(data.products)
      setPages(data.pages)
      setPage(data.page)
      setLoadingProducts(false)
    } catch(err) {
      setErrorProducts(err)
      console.log("ERROR_GET_PRODUCT", err)
    }
  }

  // const reloader = () => {
  //   if(user) {
  //     console.log("only user")
  //   }
  // }

  // useEffect(() => {
  //   reloader()
  // }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <OrderContext.Provider 
      value={{
        createOrder,
        order,
      }}>
      {children}
    </OrderContext.Provider>
  )
};