import Head from 'next/head'
import { Cat } from '@/domain/cat'
import { Table } from 'react-bootstrap'
import { CatsService } from '@/services/api/cats-service'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SearchBar from '../../components/SearchBar'
import Alert from 'react-bootstrap/Alert'
import {useState} from 'react'

const service = new CatsService()

export default function CatsPage({ cats } : any) {
  const [errorMessage, setErrorMessage] = useState('')

  const [catList, setCatList] = useState(cats)

  return (
    <>
      <Head>
        <title>View your cats</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Alert variant="danger" dismissible show={errorMessage.length != 0} onClose={() => {setErrorMessage('')}}>
          <Alert.Heading>An error occurred</Alert.Heading>
          <p>
            {errorMessage}
          </p>
        </Alert>
        <Container className={'ps-0 pe-0'}>
          <Row className={'align-items-center'}>
            <Col lg={true}>
              <h1>View your cats</h1>
            </Col>
            <Col sm={'auto'}>
              <Link href={'/cats/register'} className={'btn btn-success'}>
                Register Cat...
              </Link>
            </Col>
          </Row>
          <Row className="align-items-center">
            <SearchBar onSearch={setCatList} onError={setErrorMessage}/>
          </Row>
        </Container>

        {catList?.length > 0 &&
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {catList.map((c: Cat) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.description}</td>
                <td>
                  <Link href={`/cats/${c.id}`} className='btn btn-primary btn-auth0-cta btn-padded'>
                    View
                  </Link>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        }
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
    try {
      const cats = await service.all()
      return { props: { cats } }
    } catch (err) {
      console.log(err)
      return { notFound: true }
    }
}
