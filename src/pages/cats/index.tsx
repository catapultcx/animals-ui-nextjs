import Head from 'next/head';
import { Cat } from '@/domain/cat';
import { Button, Table } from 'react-bootstrap';
import { CatsService } from '@/services/api/cats-service';
import Link from 'next/link';
import router from 'next/router';

const service = new CatsService();

export default function CatsPage({ cats }: any) {
  const handleDelete = async (id: string) => {
    const result = await service.delete(id);
    if (result) {
      router.push('/cats');
    }
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
            {cats?.length > 0 &&
              cats.map((c: Cat) => (
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
