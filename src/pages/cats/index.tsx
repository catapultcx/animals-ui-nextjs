import Head from 'next/head'
import { Cat } from '@/domain/cat'
import { Button, Table } from 'react-bootstrap'
import { CatsService } from '@/services/api/cats-service'
import Link from 'next/link'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert';

const service = new CatsService()

export default function CatsPage({ cats } : any) {
  const [state, setState] = useState({cats, name:"", desc:""});
  
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
                <th colSpan={4}>
                  <Row>
                    <Col>
                      <Form.Control as="input" 
                            value={state.name}
                            data-testid="name-search-input"
                            placeholder="Filter by name"
                            onChange={(e)=>setState({...state, name:e.target.value})}
                            />
                    </Col>
                    <Col>
                      <Form.Control as="input" 
                          data-testid="desc-search-input"
                          value={state.desc}
                          placeholder="Filter by description"
                          onChange={(e)=>setState({...state, desc:e.target.value})}
                          />
                    </Col>
                    <Col>
                      <Button variant="secondary" 
                          onClick={async ()=>{
                            const results = await service.search({name:state.name, desc:state.desc});
                            setState({...state, cats: results});
                          }}>
                            Filter
                      </Button>
                    </Col>
                  </Row>
                </th>
              </tr>
              <tr>

                <th>#</th>
                <th> 
                  Name
                  
                </th>
                <th>
                  Description
                  
                </th>
                <th></th>
              </tr>
            </thead>
            {state.cats?.length > 0 &&
              (<tbody>
                  { state.cats.map((c: Cat) => (
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
                </tbody>)}
          </Table>
          {state.cats?.length === 0 && <Alert variant="warning">No Cats found</Alert>}
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
