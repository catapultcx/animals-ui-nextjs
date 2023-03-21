import Head from 'next/head'
import { Cat } from '@/domain/cat'
import { Table, Button } from 'react-bootstrap'
import { CatsService } from '@/services/api/cats-service'
import Link from 'next/link'
import styles from '@/styles/Cats.module.scss'
import { useState } from 'react'
import { AddCatRow } from '@/components/AddCatRow'

const service = new CatsService()

export default function CatsPage({ cats } : any) {
  const [catsList, setCatsList] = useState<Cat[]>(cats)

  const handleAddCat = () => {
    setCatsList([{ id: '', name: '', description: ''} as Cat,...catsList])
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
        <div className={styles.title}><h1>View your cats</h1><Button onClick={handleAddCat}>Add a cat</Button></div>
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
            {catsList?.length > 0 &&
              catsList.map((c: Cat, index: number) => {
                if (!c.name) {
                  return <AddCatRow key={index} successHandler={ (cat: Cat) => {
                    catsList.splice(index, 1)
                    setCatsList([cat, ...catsList])
                  } }/>
              } else return (
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
                )
              })}
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
