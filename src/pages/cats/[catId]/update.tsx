import Head from 'next/head'
import React from 'react'
import CatForm, {SaveMode} from '@/components/CatForm'
import {Cat} from '@/domain/cat'
import {CatsService} from '@/services/api/cats-service'

const service = new CatsService()

export default function UpdateCatPage({ cat } : {cat: Cat} ) {
  return (
    <>
      <Head>
        <title>Update cat</title>
        <meta name="description" content="Update a cat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Update cat</h1>
        <CatForm cat={cat} mode={SaveMode.UPDATE}></CatForm>
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
