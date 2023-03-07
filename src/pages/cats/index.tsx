import Head from 'next/head'
import { Cat } from '@/domain/cat'
import { Table } from 'react-bootstrap'
import { CatsService } from '@/services/api/cats-service'
import Link from 'next/link'
import { useState } from 'react';

const service = new CatsService()

export default function CatsPage({ cats }: any) {
  const [filterName, setFilterName] = useState<string>('');
  const [filterDescription, setFilterDescription] = useState<string>('');
  const [catList, resetCatList] = useState<[]>(cats);

  const handleFilter = async () => {
    let filterParams = "";
    if (filterName) {
      filterParams += `&name=${filterName}`;
    }
    if (filterDescription) {
      filterParams += `&description=${filterDescription}`;
    }
    console.log('filterParams: ', filterParams);

    setFilterName('');
    setFilterDescription('');
    resetCatList(await service.all(filterParams))
    //return { props: { cats } };
  };

  return (
    <>
      <Head>
        <title>View your cats</title>
        <meta name="description" content="Your Cats" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>View your cats</h1>
        {
        catList?.length === 0 ?
        <>
        <h2>Sorry not not find what you are looking for! </h2>
        <button className='rounded p-2 m-1 btn-outline-dark border border-dark' onClick={handleFilter}>Reset Filter</button>
        </>
        :
        catList?.length > 0 &&
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                #
                </th>
              <th>Name</th>
              <th>Description</th>
              <th>
                <input  className='rounded p-2 m-1' placeholder="FILTER BY NAME" type="text" id="filterName" value={filterName} onChange={(event) => setFilterName(event.target.value)} />
                <input  className='rounded p-2 m-1' placeholder="FILTER BY DESCRIPTION" type="text" id="filterDescription" value={filterDescription} onChange={(event) => setFilterDescription(event.target.value)} />
                <button className='rounded p-2 m-1 btn-outline-dark border border-dark' onClick={handleFilter}>Click to Filter</button>
              </th>
            </tr>
          </thead>
          <tbody>
              {
              catList.map((c: Cat) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                  <td>
                    <Link href={`/cats/${c.id}`} className='btn btn-primary btn-auth0-cta btn-padded btn-block'>
                      View
                    </Link>
                    <Link href={`/cats/${c.id}/update`} className='btn btn-warning btn-auth0-cta btn-padded btn-block m-1'>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
              }
          </tbody>
        </Table>
        }
      </main>
    </>
  )
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
