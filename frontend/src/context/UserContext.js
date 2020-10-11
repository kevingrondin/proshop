import React, { createContext, useState } from "react"
import axios from "axios"

export const UserContext = createContext(null)

export default ({ children }) => {
  const config_header = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const [errorLoginUser, setErrorLoginUser] = useState(null)
  const [errorRegisterUser, setErrorRegisterUser] = useState(null)

  const [loadingLoginUser, setLoadingLoginUser] = useState(false)
  const [loadingRegisterUser, setLoadingRegisterUser] = useState(false)

  const [user, setUser] = useState(null)

  const login = async (credentials) => {
    try {
      setLoadingLoginUser(true)
      let {data, type} = await axios.post(
        `/api/users/login`, 
        credentials,
        config_header,
      )
      switch(type) {
        case 'success':
          setLoadingLoginUser(false)
          localStorage.setItem('user', JSON.stringify(data))
          setUser(data)
          break
        case 'error':
          setLoadingLoginUser(false)
          setErrorLoginUser(data)
          break
        default:
          setErrorLoginUser("Error_Post_Login")
      }
    } catch(err) {
      setErrorLoginUser(err)
      console.log(err)
    }
  }

  const register = async (credentials) => {
    try {
      setLoadingRegisterUser(true)
      let res = await fetch(`/api/users`,{
        method: "POST",
        body: JSON.stringify(credentials),
        config_header
      })
      let {data, type} = res.json()
      console.log(data, type)
      // switch(type) {
      //   case 'success':
      //     setLoadingRegisterUser(false)
      //     // localStorage.setItem('user', JSON.stringify(data))
      //     setUser(data)
      //     break
      //   case 'error':
      //     setLoadingRegisterUser(false)
      //     setErrorRegisterUser(data)
      //     break
      //   default:
      //     setErrorRegisterUser("Error_Post_Login")
      // }
    } catch(err) {
      // setErrorRegisterUser(err)
      console.log("ERROR_REGISTER", err)
    }
  }

  return (
    <UserContext.Provider value={{ 
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
    </UserContext.Provider>
  )
};