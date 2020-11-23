import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'

export const OrderContext = createContext(null)

export default ({ children }) => {
  const { user } = useContext(UserContext)

  const [order, setOrder] = useState({
    loading: false,
    sucess: true,
    data: null,
    error: null
  })

  // axios.defaults.headers["Content-Type"] = 'application/json'
  // axios.defaults.headers["Authorization"] = `Bearer ${user.token}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.token}`
    }
  }

  const createOrder = async (dataOrder) => {
    try {
      await setOrder({ ...order, loading: true })
      console.log('posts orders', dataOrder)
      const { data } = await axios.post('/api/orders/', dataOrder, config)
      await setOrder({ ...order, data })
      setOrder({ ...order, loading: false })
    } catch (err) {
      setOrder({ ...order, error: err })
      console.log('ERROR_GET_PRODUCTDETAIL', err)
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
        setOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
