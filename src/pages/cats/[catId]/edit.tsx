import Head from 'next/head'
import { Cat } from '@/domain/cat'
import { CatsService } from '@/services/api/cats-service'
import Editor from '@/components/animal/editor';

const service = new CatsService();

export default function EditCatPage({ cat } : {cat: Cat} ) {

  return (
    <>
      <Head>
        <title>Edit a cat</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <h1>Edit {cat.name}</h1>
          <Editor animal={cat} 
                onSave={(name, description)=>{
              //Hit the save End point
              const updatedCat = ({...cat, name, description});
              console.log(updatedCat);
              return Promise.resolve();
          }}></Editor>
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
