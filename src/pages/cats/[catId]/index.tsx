import Head from 'next/head'
import { Cat } from '@/domain/cat'
import { Form, Table } from 'react-bootstrap'
import { CatsService } from '@/services/api/cats-service'
import { ViewCat } from '@/components/ViewCat';
import { MutateCat } from '@/components/MutateCat';
import { useCallback } from 'react';

const apiService = new CatsService('/api-cats');  

export default function CatPage({ cat, isEdit } : {cat: Cat, isEdit: boolean} ) {
  const handleCatUpdate = useCallback((newCat: Cat) => {
    apiService.update(newCat.id, newCat).then(() => {
      console.log('cat has been updated successfully');
    }).catch(console.error);
  }, []);
  
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
        {
          isEdit ? <MutateCat cat={cat} btnClickCallback={handleCatUpdate}/> : <ViewCat cat={cat}/>
        }
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const service = new CatsService();  
  try {
      const cat = await service.get({ id: context?.params?.catId })
      const isEdit = context?.query?.isEdit === 'true';
      
      return { props: { cat, isEdit } }
    } catch (err) {
      console.error(err)
      return { notFound: true }
    }
}
