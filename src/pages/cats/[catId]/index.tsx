import Head from 'next/head'
import { Cat } from '@/domain/cat'
import { Button, Table } from 'react-bootstrap'
import { CatsService } from '@/services/api/cats-service'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router';

const service = new CatsService()

export default function CatPage ({ cat }: { cat: Cat }) {

  const router = useRouter();

  const deleteCat = (id: string) => {
    if (confirm('Are you sure want to delete cat ?')) {
      service
        .delete({ id })
        .then(() => {
          router.push('/cats');
        })
        .catch((err) => {
          console.log(err)
        });
    }
  };

  return (
    <>
      <Head>
        <title>Your cat { cat.name }</title>
        <meta name="description" content="Register your animal"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main>
        <h1>Your cat { cat.name }</h1>
        <Table striped bordered hover>
          <tbody>
          <tr>
            <td>ID</td>
            <td>{ cat.id }</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{ cat.name }</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{ cat.description }</td>
          </tr>
          <tr>
            <td>Group</td>
            <td>{ cat.group }</td>
          </tr>
          </tbody>
        </Table>
        <Link href={ `/cats` } className="btn btn-primary">
          Back to Manage Cats
        </Link>
        <Link href={ `/cats/${ cat.id }/edit` } className="btn btn-success ms-3">
          Edit Cat details
        </Link>
        <Button type="button" className="btn btn-danger ms-3"
                onClick={ () => deleteCat(cat.id) }
        >
          Delete Cat
        </Button>
      </main>
    </>
  )
}

export async function getServerSideProps (context: any) {
  try {
    const cat = await service.get({ id: context?.params?.catId })
    return { props: { cat } }
  } catch (err) {
    console.log(err)
    return { notFound: true }
  }
}
