import React, { useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { UserContext } from "../context/UserContext"

// const useQuery = () => new URLSearchParams(useLocation().search)

const LoginScreen  = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // const query = useQuery()
  const { errorRegisterUser, login, loadingLoginUser, user} = useContext(UserContext)
  const [credentials, setCredentials] = useState({
    email: location?.state?.email ?? 'kevingrondin@outlook.com',
    password: ''
  })

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCredentials({...credentials, [name]: value})
  }

  useEffect(() => {
    if(user && location?.state?.redirect)
      navigate(String(location?.state?.redirect))
    if(user && !location?.state?.redirect)
      navigate('/', { replace: true })
  }, [user, location]) // eslint-disable-line react-hooks/exhaustive-deps

  const _redirectRegisterWithEmail = () => 
    navigate("/register", { state: { email: credentials?.email }})

  const submitHandler = (e) => {
    e.preventDefault()
    try {
      login(credentials)
    }catch(err) {
      _redirectRegisterWithEmail()
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {errorRegisterUser && <Message variant='warning'>{errorRegisterUser}</Message>}
      {loadingLoginUser && <Loader />}
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
         <Button
          onClick={ () =>_redirectRegisterWithEmail()}>
            New Customer?
         </Button>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen