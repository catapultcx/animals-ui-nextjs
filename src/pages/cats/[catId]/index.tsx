import Head from 'next/head'
import { Cat } from '@/domain/cat'
import { Table } from 'react-bootstrap'
import { CatsService } from '@/services/api/cats-service'
import Link from 'next/link'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Router from 'next/router';

const service = new CatsService()

export default function CatPage({ cat } : {cat: Cat} ) {
 
  return (
    <>
      <Head>
        <title>Your cat {cat.name}</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            <tr>
              <td colSpan={2}>
                <Row>
                  <Col xs={1}>
                    <Link href={`/cats/${cat.id}/edit`} className='btn btn-primary btn-padded'>
                          Edit
                    </Link>
                  </Col>
                  <Col xs={1} >
                    <Button variant="danger" onClick={async ()=>{
                        if(!cat.id){
                          return;
                        }
                        await service.delete(cat.id.toString());
                        Router.push('/cats');
                    }}>Delete</Button>
                  </Col>
                </Row>
              </td>
            </tr>                                     
          </tbody>
        </Table>
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
