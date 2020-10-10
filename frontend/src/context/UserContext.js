import React, { createContext, useState } from "react"

export const UserContext = createContext(null)

export default ({ children }) => {
  const [errorUser, setErrorUser] = useState(null)
  const [errorRegisterUser, setErrorRegisterUser] = useState(null)

  const [loadingUser, setLoadingUser] = useState(true)
  const [loadingRegisterUser, setLoadingRegisterUser] = useState(true)

  const [user, setUser] = useState(null)

  const register = async (id) => {
    try {
      setLoadingProductDetail(true)
      let response = await fetch(`/api/products/${id}`)
      let data = await response.json()
      setProductDetail(data)
      setLoadingProductDetail(false)
    } catch(err) {
      setErrorProductDetail(err)
      console.log("ERROR_GET_PRODUCTDETAIL", err)
    }
  }

  return (
    <UserContext.Provider value={{ 
      errorUser,
      errorRegisterUser,
      loadingUser,
      loadingRegisterUser,
      setErrorUser,
      setErrorRegisterUser,
      setLoadingUser,
      setUser, 
      user,
      register 
    }}>
      {children}
    </UserContext.Provider>
  )
};