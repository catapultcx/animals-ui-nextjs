import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import { useState } from 'react'
import { CatsService } from '@/services/api/cats-service'
import { Table } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { Cat } from '@/domain/cat'

const service = new CatsService()
export default function UpdatePage({ cat } : {cat: Cat} ) {

  const [catName, setCatName] = useState("");
  const [catDescription, setCatDescription] = useState("");
  const [catGroup] = useState("MAMMALS");
  const router = useRouter();
  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(cat);
    service.update(cat.id, catName, catDescription, catGroup)
    .then((newAnimal) => {
      console.log('New animal has been created:', newAnimal)
      router.push('/cats');
    })
    .catch((error) => {
      console.error('Error updating animal:', error)
    })

  };
  const service = new CatsService()

  return (
    <>
      <Head>
        <title>Register your animal</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1> Update your animals</h1>

        <form onSubmit={handleSubmit}>
        <Table striped bordered hover>
          <tbody>
          <tr>
            <td>
              <label htmlFor="catName">Cat Name:</label>
            </td>
            <td>
            <input
              id="catName"
              className={styles.animalName}
              type="text"
              value={catName}
              placeholder={cat.name}
              onChange={(e) => setCatName(e.target.value)}
            />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="catDescription">Cat Description:</label>
            </td>
            <td>
              <textarea
                id="catDescription"
                className={styles.description}
                value={catDescription}
                placeholder={cat.description}
                onChange={(e) => setCatDescription(e.target.value)}
              />
              </td>
            </tr>
          <tr><td colSpan={2}>
          <button className='btn btn-primary btn-auth0-cta btn-padded btn-block' type="submit">Update</button> </td></tr>
          </tbody>
        </Table>
        </form>

        <p>
          Get started by managing your cat&nbsp;
          <a href="cats">here</a>
        </p>
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
  try {
    const service = new CatsService()
    const cat = await service.get({ id: context?.params?.catId })
    return { props: { cat } }
  } catch (err) {
    console.log(err)
    return { notFound: true }
  }
}
