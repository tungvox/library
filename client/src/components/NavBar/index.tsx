import React, { useState } from 'react'
import { pure } from 'recompose'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import {Button} from 'semantic-ui-react'

import './NavBar.scss'
import GoogleButton from '../GoogleButton'
import LoginButton from '../account/LoginButton'
import LoginModal from '../account/LoginModal'

const NavBar = () => {
  const handleLogout = () => {
    sessionStorage.clear()
  }
  const [logoutButton, setLogoutButton] = useState(() => sessionStorage.length ? <Button onClick={handleLogout}>Logout</Button> : null);
  console.log(sessionStorage)

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
      {logoutButton}
      <LoginModal/>
  </Navbar>
  )
}

export default pure(NavBar)