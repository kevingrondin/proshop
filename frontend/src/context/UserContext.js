import React, { createContext, useState } from 'react'
import axios from 'axios'

export const UserContext = createContext(null)

export default ({ children }) => {
  const config_header = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const [errorLoginUser, setErrorLoginUser] = useState(null)
  const [errorRegisterUser, setErrorRegisterUser] = useState(null)

  const [loadingLoginUser, setLoadingLoginUser] = useState(false)
  const [loadingRegisterUser, setLoadingRegisterUser] = useState(false)

  const [user, setUser] = useState(null)

  const login = async (credentials) => {
    try {
      !errorLoginUser && setErrorLoginUser(null)
      setLoadingLoginUser(true)
      const res = await axios.post(
        '/api/users/login',
        credentials,
        config_header
      )
      const { data, type } = await res.data
      switch (type) {
        case 'success':
          setLoadingLoginUser(false)
          localStorage.setItem('user', data)
          setUser(data)
          break
        case 'error':
          setLoadingLoginUser(false)
          setErrorLoginUser(data)
          setTimeout(() => {
            !errorLoginUser && setErrorLoginUser(null)
          }, 4500)
          break
        default:
          setErrorLoginUser('Error_Post_Login')
      }
    } catch (err) {
      setErrorLoginUser(err)
      console.log(err)
    }
  }

  const logout = async (credentials) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    document.location.href = '/login'
  }

  const register = async (credentials) => {
    try {
      !errorRegisterUser && setErrorRegisterUser(null)
      setLoadingRegisterUser(true)
      const res = await axios.post(
        '/api/users',
        credentials,
        config_header
      )
      const { data, type } = await res.data
      switch (type) {
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
          setErrorRegisterUser('Error_Post_Login')
      }
    } catch (err) {
      // setErrorRegisterUser(err)
      console.log('ERROR_REGISTER', err)
    }
  }

  return (
    <UserContext.Provider value={{
      errorLoginUser,
      errorRegisterUser,
      loadingLoginUser,
      loadingRegisterUser,
      login,
      logout,
      setUser,
      user,
      register
    }}
    >
      {children}
    </UserContext.Provider>
  )
}
