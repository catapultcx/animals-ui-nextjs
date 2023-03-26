import Head from 'next/head'
import { Cat } from '@/domain/cat'
import {Button, Table} from 'react-bootstrap'
import { CatsService } from '@/services/api/cats-service'
import Link from "next/link";

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

        <div className="d-flex gap-2">
          <div>
            <Link href={`/cats/${cat.id}/edit`} className="btn btn-primary" data-testid="edit-button">
              Edit
            </Link>
          </div>

          <form action={`/api/cats/${cat.id}/delete`} method="POST">
            <Button type="submit" variant="danger" className="mb-3" data-testid="delete-button">Delete</Button>
          </form>
        </div>

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
