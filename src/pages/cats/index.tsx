import Head from 'next/head'
import { Cat } from '@/domain/cat'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { CatsService } from '@/services/api/cats-service'
import Link from 'next/link'
import { FormEvent, useState } from "react";

const service = new CatsService()

export default function CatsPage({ cats } : any) {

  const [search, setSearch] = useState<string>("");

  const [searchResult, setSearchResult] = useState<Cat[]>(cats);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const response = await service.all({ search });
      setSearchResult(response || []);
  }

  return (
    <>
      <Head>
        <title>View your cats</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>View your cats</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={1}>
                    Search
                </Form.Label>
                <Col>
                    <Form.Control value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search by name or description" />
                </Col>
                <Col sm={1} className="text-end">
                    <Button type="submit">Search</Button>
                </Col>
            </Form.Group>
        </Form>
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
            {searchResult?.length > 0 &&
              searchResult.map((c: Cat) => (
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
