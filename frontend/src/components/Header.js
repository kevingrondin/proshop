import React, { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import SearchBox from './SearchBox'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

import { UserContext } from "../context/UserContext"

const Header = () => {
  const location = useLocation()
  const { from } = location.state || { from : '/public' }

  const {user, setUser } = useContext(UserContext)

  const logoutHandler = () => { setUser(null) }
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <NavLink to='/'>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
            <SearchBox history={from} />
            <Nav className='ml-auto'>
              <NavLink to='/cart'>
                <Nav.Link>
                    <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </NavLink>
              {user ? (
                <NavDropdown title={user.name} id='username'>
                  <NavLink to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </NavLink>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavLink to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </NavLink>
              )}
              {user && user.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <NavLink to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </NavLink>
                  <NavLink to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </NavLink>
                  <NavLink to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </NavLink>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header