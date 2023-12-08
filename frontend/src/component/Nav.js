import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from '@chakra-ui/react'
import '../index.css'
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { Tooltip } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react'

function BasicExample() {
  const {logout}= useLogout()
  const {user} = useAuthContext()


  const handleClick=()=>{
    logout()
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="me-auto" to={"/"}>
              <Nav.Link href="#home" className='nav_link'>Home</Nav.Link>
            </Link>
            {user ? (
              // If user exists, render Link without Tooltip
              <Link className="me-auto" to={"/profile"}>
                <Nav.Link href="#profile" className='nav_link'>Profile</Nav.Link>
              </Link>
            ) : (
              // If user doesn't exist, render Link with Tooltip
              <Tooltip hasArrow label='Login/Signup to Access' bg='gray.300' color='black'>
                <Link className="me-auto" to={"/profile"}>
                  <Nav.Link href="#profile" className='nav_link'>Profile</Nav.Link>
                </Link>
              </Tooltip>
            )}



            {user && (
            <div>
                <span>
               <Avatar name={user.email.split('@')[0]} src='https://bit.ly/broken-link' />
                </span>
                <Button colorScheme='blue' variant='outline' onClick={handleClick}>Logout</Button>
            </div>
            )}
            {!user && (
            <div>
              <Link className="me-auto" to={"/login"}>
                <Nav.Link href="#login" className='nav_link'>Login</Nav.Link>
              </Link>
              <Link className="me-auto" to={"/signup"}>
                <Nav.Link href="#signup" className='nav_link'>Signup</Nav.Link>
              </Link>
             
            </div>
            )}


          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;