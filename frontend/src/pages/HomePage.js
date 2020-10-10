import React, {useContext, useEffect} from 'react'
import { NavLink, useParams } from "react-router-dom"
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import { Row, Col } from 'react-bootstrap'
import Paginate from '../components/Paginate'
import Product from '../components/Product'
import ProductCarousel from '../components/ProductCarousel'

import { ProductContext } from "../context/ProductContext"

const HomePage = () => {
  const { keyword } = useParams()
  const { loadingProducts, products, getProducts, pages, page } = useContext(ProductContext)
  
  useEffect(() => {
    getProducts(keyword)
  }, [keyword]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Meta />
      {!keyword ? <ProductCarousel /> : (
        <NavLink to='/' className='btn btn-light'>
          Go Back
        </NavLink>
      )}
      <h1>Latest Products</h1>
      {loadingProducts ? (
        <Loader />
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomePage