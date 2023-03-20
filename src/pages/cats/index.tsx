import Head from 'next/head'
import { Cat } from '@/domain/cat'
import { Table } from 'react-bootstrap'
import { CatsService } from '@/services/api/cats-service'
import Link from 'next/link'
import Filter from "@/components/Filter";
import {toast} from "react-toastify";
import {useState} from "react";

const service = new CatsService()

export default function CatsPage({ allCats } : any) {

  const [cats, setCats] = useState(allCats)
  const onFilter = (text: string) => {
      service
            .filter({text: text})
            .then((filteredCats) => {
                toast(`Filtered cats successfully`, {type: "success"});
                setCats(filteredCats)
            })
            .catch((err) => {
                toast(`Failed to filter cats with error ${err}`, {type: "error"});
          });
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
        <h1>View your cats</h1>

        <Link href={'/cats/register'} className='btn btn-primary btn-auth0-cta btn-padded float-end mb-3'>
            Register New Cat
        </Link>
         <Filter onFilter={onFilter}/>
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
      const allCats = await service.all()
      return { props: { allCats } }
    } catch (err) {
      console.log(err)
      return { notFound: true }
    }
}
