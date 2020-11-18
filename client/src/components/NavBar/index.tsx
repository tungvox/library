import React from 'react'
import { pure } from 'recompose'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

import './NavBar.scss'
import GoogleButton from '../GoogleButton'
import LoginButton from '../account/LoginButton'
import LoginModal from '../account/LoginModal'

const NavBar = () => {

  return (
    <Navbar bg="dark" variant="dark">
    {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
    <Nav className="mr-auto">
      <Link to={`/`}>Home</Link>
      <br></br>
      <Link to={`/author`}>Author</Link>
      <br></br>
      <Link to={`/book`}>Book</Link>
    </Nav>
      {/* <GoogleButton /> */}
      {/* <LoginButton /> */}
      <LoginModal/>
  </Navbar>
  )
}

export default pure(NavBar)