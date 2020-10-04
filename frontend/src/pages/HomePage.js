import React, {useContext, useEffect} from 'react'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import ProductCarousel from '../components/ProductCarousel'

import { ProductContext } from "../context/ProductContext"

const HomePage = () => {
  const { loadingProduct, products, getProducts } = useContext(ProductContext)

  useEffect(() => {
    getProducts()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Meta />
      <ProductCarousel />
      <h1>Latest Products</h1>
      {loadingProduct ? (
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
          {/* <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          /> */}
        </>
      )}
    </>
  )
}

export default HomePage