import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Image from 'next/image'
import Link from 'next/link'

const NavBar = () => {
  return (
    <div className='nav-container' data-testid='navbar'>
      <Navbar bg='light' expand='lg' className='and-main-nav'>
        <Container>
          <Navbar.Brand href='/'>
            <Image
              src='/CatapultLandscapeLogoRGBMediumRes.png'
              alt='Catapult logo'
              data-testid='main-nav-logo'
              width='120'
              height='50'
              className='navbar-brand__logo'
            />
          </Navbar.Brand>
          <div className='navbar-cta-wrapper'>
          </div>
          <Navbar.Collapse id='and-navbar-nav'>
            <Nav className='me-auto' data-testid='navbar-items'>
                <>
                  <Link
                    href='/'
                    className='nav-link'
                  >
                    Home
                  </Link>
                  <Link
                    href='/cats'
                    className='nav-link'
                  >
                    Manage cats
                  </Link>
                </>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar
