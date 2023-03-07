import Head from 'next/head'
import { Cat } from '@/domain/cat'
import { Button, Table } from 'react-bootstrap'
import { CatsService } from '@/services/api/cats-service'
import router from 'next/router'

export default function CatPage({ cat } : {cat: Cat} ) {

  const service = new CatsService()
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('removing '+ cat.id);

    service.delete(cat.id)
    .then((newCat) => {
      console.log('New cat has been registered:', newCat)
      router.push('/cats');
    })
    .catch((error) => {
      console.error('Error creating new animal:', error)
    })

  };

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
              <td>Action</td>
              <td>
              <form onSubmit={handleSubmit}>
                <Button type="submit" className='btn btn-danger btn-auth0-cta btn-padded btn-block m-1'>
                  Delete
                </Button>
                </form>
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
      const service = new CatsService()
      const cat = await service.get({ id: context?.params?.catId })
      return { props: { cat } }
    } catch (err) {
      console.log(err)
      return { notFound: true }
    }
}
