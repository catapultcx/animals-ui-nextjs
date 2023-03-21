import Head from 'next/head'
import { Cat } from '@/domain/cat'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { CatsService } from '@/services/api/cats-service'
import { MouseEvent } from "react";
import { useRouter } from "next/router";

const service = new CatsService()

export default function CatPage({ cat } : {cat: Cat} ) {

  const router = useRouter();

  const deleteHandler = async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      await service.delete({ id: cat.id });
      await router.push("/cats");
  }

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
          </tbody>
          </Table>
          <Row>
              <Col>
                  <Button onClick={deleteHandler} variant="danger" className="mb-3">Delete Cat</Button>
              </Col>
          </Row>
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
