import Head from 'next/head'
import { Cat } from '@/domain/cat'
import { Table } from 'react-bootstrap'
import { CatsService } from '@/services/api/cats-service'
import React, {useState} from 'react'
import {useRouter} from 'next/router'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const service = new CatsService()

export default function CatPage({ cat } : {cat: Cat} ) {
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  const deleteCat = (id: string) => {
    service
      .delete( { id: id })
      .then(() => {
        router.push('/cats')
      })
      .catch((err) => {
        setErrorMessage(err.message)
      })
  }

  return (
    <>
      <Head>
        <title>Your cat {cat.name}</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Alert variant={'danger'} dismissible show={errorMessage.length != 0} onClose={() => setErrorMessage('')}>
        <Alert.Heading>
          An error occurred
        </Alert.Heading>
        <p>
          {errorMessage}
        </p>
      </Alert>
      <main>
        <h1>Your cat {cat.name}</h1>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{cat.id}</td>
            </tr>             
            <tr>
              <td>Name</td>
              <td>{cat.name}</td>
            </tr>             
            <tr>
              <td>Description</td>
              <td>{cat.description}</td>
            </tr>                                        
          </tbody>
        </Table>
        <Container className={'ps-0 pe-0'}>
          <Row xs={'auto'}>
            <Col>
              <Button aria-label={'Delete button'} onClick={() => deleteCat(cat.id)} className='btn btn-danger'>
                Delete
              </Button>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
    try {
      const cat = await service.get({ id: context?.params?.catId })
      return { props: { cat } }
    } catch (err) {
      console.log(err)
      return { notFound: true }
    }
}
