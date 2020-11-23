import React, { createContext, useState } from 'react'
// import { UserContext } from "../context/UserContext"

export const ProductContext = createContext(null)

export default ({ children }) => {
  // const {user } = useContext(UserContext)

  const [errorProductDetail, setErrorProductDetail] = useState(null)
  const [errorProducts, setErrorProducts] = useState(null)
  const [errorTopProducts, setErrorTopProducts] = useState(null)

  const [loadingProductDetail, setLoadingProductDetail] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loadingTopProducts, setLoadingTopProducts] = useState(true)

  const [page, setPage] = useState('')
  const [pages, setPages] = useState('')

  const [productDetail, setProductDetail] = useState([])
  const [products, setProducts] = useState([])
  const [topProducts, setTopProducts] = useState([])

  const getProductById = async (id) => {
    try {
      setLoadingProductDetail(true)
      const response = await fetch(`/api/products/${id}`)
      const data = await response.json()
      setProductDetail(data)
      setLoadingProductDetail(false)
    } catch (err) {
      setErrorProductDetail(err)
      console.log('ERROR_GET_PRODUCTDETAIL', err)
    }
  }

  const getProducts = async (keyword = '', pageNumber = '') => {
    try {
      setLoadingProducts(true)
      const response = await fetch(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
      const data = await response.json()
      setProducts(data.products)
      setPages(data.pages)
      setPage(data.page)
      setLoadingProducts(false)
    } catch (err) {
      setErrorProducts(err)
      console.log('ERROR_GET_PRODUCT', err)
    }
  }

  const getTopProducts = async () => {
    try {
      setLoadingTopProducts(true)
      const response = await fetch('/api/products/top')
      const data = await response.json()
      setTopProducts(data)
      setLoadingTopProducts(false)
    } catch (err) {
      setErrorTopProducts(err)
      console.log('ERROR_GET_TOP_PRODUCT', err)
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
        errorProductDetail,
        errorProducts,
        errorTopProducts,
        getProductById,
        getProducts,
        getTopProducts,
        loadingProductDetail,
        loadingProducts,
        loadingTopProducts,
        page,
        pages,
        productDetail,
        products,
        topProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
