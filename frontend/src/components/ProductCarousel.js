import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'

import { ProductContext } from "../context/ProductContext"

const ProductCarousel = () => {
  const { errorProduct, loadingProduct, topProducts, getTopProducts } = useContext(ProductContext)

  useEffect(() => {
    getTopProducts()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return loadingProduct ? (
    <Loader />
  ) : errorProduct ? (
    <Message variant='danger'>{errorProduct}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {topProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel