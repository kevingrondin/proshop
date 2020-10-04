import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

import { UserContext } from "../context/UserContext"

const LoginScreen  = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCredentials({...credentials, [name]: value})
  }

  useEffect(() => {
    if(user)
      navigate("/", { replace : true })
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const submitHandler = (e) => {
    e.preventDefault()
    setUser(credentials)
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {/* {error && <Message variant='danger'>{error}</Message>}
      {loading && Loader} */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Adress</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={credentials.email}
            onChange={ e => handleChange(e)}>  
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={credentials.password}
            onChange={ e => handleChange(e)}>  
          </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          {/* <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>
            Register
          </Link> */}
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen