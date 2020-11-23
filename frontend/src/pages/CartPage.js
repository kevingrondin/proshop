import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'

import { CartContext } from '../context/CartContext'

const useQuery = () => new URLSearchParams(useLocation().search)

const CartPage = () => {
  const navigate = useNavigate()
  const query = useQuery()
  const { productId } = useParams()
  const { addToCart, cart, removeFromCart } = useContext(CartContext)

  const [qty, setQty] = useState(1)

  useEffect(() => setQty(+query.get('qty')), [query])

  useEffect(() => {
    if (productId) {
      addToCart(productId, qty)
    }
  }, [productId, qty]) // eslint-disable-line react-hooks/exhaustive-deps

  const removeFromCartHandler = (id) =>
    removeFromCart(id)

  const checkoutHandler = () =>
    navigate('/login', { state: { redirect: '/shipping' } })
    // navigate("/login?redirect=shipping")

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cart?.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cart?.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => addToCart(item.product, +e.target.value)}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash' />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cart?.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cart
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cart.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartPage
