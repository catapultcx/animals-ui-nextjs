import React, { ReactNode } from 'react'
import { Container } from 'react-bootstrap'
import Head from 'next/head'

import NavBar from './NavBar'
import Footer from './Footer'

interface Children {
  children: ReactNode
}

export default function Layout({ children }: Children)  {
  return (
    <>
      <Head>
        <title>Animals</title>
      </Head>
      <main
        id='app'
        className='app-wrapper d-flex flex-column h-100'
      >
        <NavBar />
        <Container className='flex-grow-1 mt-5'>{children}</Container>
        <Footer />
      </main>
    </>
  ) 
}