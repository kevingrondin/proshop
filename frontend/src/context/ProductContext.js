import React, { createContext, useState} from "react"
// import { UserContext } from "../context/UserContext"

export const ProductContext = createContext(null)

export default ({ children }) => {
  // const {user } = useContext(UserContext)

  const [ errorProduct, setErrorProduct ] = useState(null)
  const [ errorTopProduct, setErrorTopProduct ] = useState(null)
  const [ loadingProduct, setLoadingProduct ] = useState(true)
  const [ loadingTopProduct, setLoadingTopProduct ] = useState(true)
  const [ page, setPage ] = useState('')
  const [ pages, setPages ] = useState('')
  const [ products, setProducts ] = useState([])
  const [ topProducts, setTopProducts ] = useState([])

  const getProducts = async (keyword = '', pageNumber = '') => {
    try {
      setLoadingProduct(true)
      let response = await fetch(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
      let data = await response.json()
      setProducts(data.products)
      setPages(data.pages)
      setPage(data.page)
      setLoadingProduct(false)
    } catch(err) {
      setErrorProduct(err)
      console.log("ERROR_GET_PRODUCT", err)
    }
  }

  const getTopProducts = async () => {
    try {
      setLoadingTopProduct(true)
      let response = await fetch(`/api/products/top`)
      let data = await response.json()
      setTopProducts(data)
      setLoadingTopProduct(false)
    } catch(err) {
      setErrorTopProduct(err)
      console.log("ERROR_GET_TOP_PRODUCT", err)
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
    <ProductContext.Provider 
      value={{
        errorProduct, 
        errorTopProduct,
        getProducts,
        getTopProducts, 
        loadingProduct,
        loadingTopProduct,
        page,
        pages,
        products,
        topProducts
      }}>
      {children}
    </ProductContext.Provider>
  )
};