import Head from 'next/head'
import { Cat } from '@/domain/cat'
import { Table } from 'react-bootstrap'
import { CatsService } from '@/services/api/cats-service'
import Link from 'next/link'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const service = new CatsService()

export default function CatsPage({ cats } : any) {
  return (
    <>
      <Head>
        <title>View your cats</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <Row>
          <Col>
            <h1>View your cats</h1>
          </Col>
          <Col lg="2">
               <Link href="/cats/new" className='btn btn-primary btn-auth0-cta btn-padded'>
                      Add a cat
                </Link>
          </Col>
      </Row>
        
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
            {cats?.length > 0 &&             
              cats.map((c: Cat) => (
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
