import React from 'react';

import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>FoodCravings</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='/cart'>
                <FaShoppingCart /> Order Now
              </Nav.Link>
              <Nav.Link href='/signin'>
                <FaUser /> Signin
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
