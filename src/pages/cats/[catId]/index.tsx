import Head from 'next/head'
import { Cat } from '@/domain/cat'
import {Button, Table} from 'react-bootstrap'
import { CatsService } from '@/services/api/cats-service'
import { useRouter } from 'next/router'

const service = new CatsService()

export default function CatPage({ cat } : {cat: Cat} ) {
  const router = useRouter()
  const handleClickDelete = async (id: string) => {
    const fetchResponse = await fetch('/api/delCat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
    if (fetchResponse.ok) {
      await router.push('/cats')
    }
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
            <tr>
              <td colSpan={2} style={{ textAlign: 'center'}}>
                <Button onClick={() => handleClickDelete(cat.id)} variant="warning" data-testid="Delete-button">Delete</Button>
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
