import Head from 'next/head'
import Editor from '@/components/animal/editor';
import { CatsService } from '@/services/api/cats-service'
import Router from 'next/router'


export default function NewCatPage() {
  const service = new CatsService();
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
                onSave={async (name, description)=>{
                  await service.add({name, description});
                  Router.push('/cats');
          }}></Editor>
      </main>
    </>
  )
}

