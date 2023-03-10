import Head from 'next/head'
import Editor from '@/components/animal/editor';

export default function NewCatPage() {

  return (
    <>
      <Head>
        <title>New cat</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <h1>Add a new cat</h1>
          <Editor 
                onSave={(name, description)=>{
              //Hit the save End point
              console.log({name, description});
              return Promise.resolve();
          }}></Editor>
      </main>
    </>
  )
}

