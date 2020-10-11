import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'

import { UserContext } from "../context/UserContext"

// const useQuery = () => new URLSearchParams(useLocation().search)

const LoginScreen  = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // const query = useQuery()
  const { errorRegisterUser, login, user} = useContext(UserContext)
  const [credentials, setCredentials] = useState({
    email: location?.state?.email ?? '',
    password: ''
  })
  // const redirect = query?.search ?? '/'

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
    try {
      login(credentials)
    }catch(err) {
      // si l'email n'existe pas on redirige vers inscription avec la donnée email
      navigate("/register", { state: { email: credentials.email }})
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {errorRegisterUser && <Message variant='warning'>{errorRegisterUser} vous pouvez vous connecter</Message>}
      {/* {error && <Message variant='danger'>{error}</Message>}
      {loading && Loader} */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Adress</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            value={credentials.email}
            onChange={handleChange}>  
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Enter password'
            value={credentials.password}
            onChange={handleChange}>  
          </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          {/* <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link> */}
         <Link to='/register'>
           Register
         </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen