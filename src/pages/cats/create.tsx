import Head from 'next/head'
import CatComponent from '@/components/cat/CatComponent'

export default function CreateCatPage () {
  return (
    <>
      <Head>
        <title>Register a new Cat</title>
      </Head>
      <main>
        <h1>Register a new Cat</h1>
        <CatComponent/>
      </main>
    </>
  )
}
