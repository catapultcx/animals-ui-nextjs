import Head from 'next/head';
import { Cat } from '@/domain/cat';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { CatsService } from '@/services/api/cats-service';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';

const service = new CatsService();

export default function CatsPage({ cats }: any) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [searchResults, setSearchResults] = useState(cats);

  const handleSearch = async () => {
    const results = await service.search(name, description);
    setSearchResults(results);
  };

  const handleDelete = async (id: string) => {
    const result = await service.delete(id);
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>View your cats</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link
          href={`/cat`}
          className="btn btn-primary btn-auth0-cta btn-padded"
        >
          Add Cat
        </Link>
        <br />
        <br />
        {/* Search filters */}
        <Form>
          <Row>
            <Col>
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter cat name to search"
                onChange={(e) => setName(e.target.value)}
                data-testid="name"
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                value={description}
                placeholder="Enter cat description to search"
                onChange={(e) => setDescription(e.target.value)}
                data-testid="description"
              />
            </Col>
            <Col xs="auto">
              <Button variant="primary" type="button" onClick={handleSearch}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <br />

        <h1>View your cats</h1>
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
            {searchResults?.length > 0 &&
              searchResults.map((c: Cat) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                  <td>
                    <Link
                      href={`/cats/${c.id}`}
                      className="btn btn-primary btn-auth0-cta btn-padded"
                    >
                      View
                    </Link>{' '}
                    <Link
                      href={`/cats/${c.id}/edit`}
                      className="btn btn-primary btn-auth0-cta btn-padded"
                    >
                      Edit
                    </Link>{' '}
                    <Button
                      variant="danger"
                      type="button"
                      onClick={(e) => handleDelete(`${c.id}`)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const cats = await service.all();
    return { props: { cats } };
  } catch (err) {
    console.log(err);
    return { notFound: true };
  }
}
