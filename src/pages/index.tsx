import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Register your animal</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome, register your animals</h1>
        <p>
          Get started by managing your cat&nbsp;
          <a href="cats">here</a>
        </p>
      </main>
    </>
  )
}
