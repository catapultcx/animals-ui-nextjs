import Head from 'next/head'
import { Cat } from '@/domain/cat'
import { Table } from 'react-bootstrap'
import { CatsService } from '@/services/api/cats-service'
import Link from "next/link";

const catsService = new CatsService()

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
            <thead>
            <tr>
                <th>
                    <Link href={`/cats/${cat.id}/update`} className='btn btn-primary btn-auth0-cta btn-padded float-end'>
                        Update
                    </Link>
                </th>
                <th>
                    <Link href={`/api/cats/${cat.id}/delete`} className='btn btn-primary btn-auth0-cta btn-padded float-end'>
                        Delete
                    </Link>
                </th>
            </tr>
            </thead>
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
      const cat = await catsService.get({ id: context?.params?.catId })
      return { props: { cat } }
    } catch (err) {
      console.log(err)
      return { notFound: true }
    }
}
