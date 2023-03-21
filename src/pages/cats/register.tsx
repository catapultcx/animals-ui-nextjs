import Head from 'next/head'
import React from 'react'
import CatForm, {SaveMode} from '@/components/CatForm'

export default function RegisterCatPage() {
  return (
    <>
      <Head>
        <title>Register cat</title>
        <meta name="description" content="Register a cat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Register cat</h1>
        <CatForm mode={SaveMode.CREATE}></CatForm>
      </main>
    </>
  )
}