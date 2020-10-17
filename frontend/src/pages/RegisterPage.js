import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { UserContext } from "../context/UserContext"

const RegisterPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { errorRegisterUser, loadingRegisterUser, user, register } = useContext(UserContext)

  const [credentials, setCredentials] = useState({
    email: location?.state?.email ?? "kevingrondin@outlook.com",
    name: 'kevin',
    password: 'acyzkh',
    confirmPassword: 'acyzkh',
    message: null
  })

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCredentials({...credentials, [name]: value})
  }

  useEffect(() => {
    if (user)
      navigate('/')
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (errorRegisterUser === 'utilisateur déja connu')
      navigate('/login', { state: { email: credentials.email }})
  }, [errorRegisterUser]) // eslint-disable-line react-hooks/exhaustive-deps


  const submitHandler = (e) => {
    e.preventDefault()
    try {
      if (credentials.password === credentials.confirmPassword) {
        register({
          name : credentials.name, 
          email : credentials.email, 
          password : credentials.password
        })
      }
    }catch(err) {
      // si l'email n'existe pas on redirige vers inscription avec la donnée email
      // navigate("/register", { state: { email: credentials.email }})
      console.log(err)
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {credentials.message && <Message variant='danger'>{credentials.message}</Message>}
      {errorRegisterUser && <Message variant='danger'>{errorRegisterUser}</Message>}
      {loadingRegisterUser && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            name='name'
            placeholder='Enter name'
            value={credentials.name}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            value={credentials.email}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Enter password'
            value={credentials.password}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            name='confirmPassword'
            placeholder='Confirm password'
            value={credentials.confirmPassword}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?
          <Link to='/login'>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterPage