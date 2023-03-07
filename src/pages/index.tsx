import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import { useState } from 'react'
import { CatsService } from '@/services/api/cats-service'
import { Table } from 'react-bootstrap'
import { useRouter } from 'next/router'

const service = new CatsService()

const HomePage = () => {
  const [catName, setCatName] = useState("");
  const [catDescription, setCatDescription] = useState("");
  const [catGroup] = useState("MAMMALS");
  const router = useRouter();
  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    service.create(catName, catDescription, catGroup)
    .then((newAnimal) => {
      console.log('New animal has been created:', newAnimal)
      router.push('/cats');
    })
    .catch((error) => {
      console.error('Error creating new animal:', error)
    })
  };

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
                onChange={(e) => setCatDescription(e.target.value)}
              />
              </td>
            </tr>
          <tr><td colSpan={2}>
          <button className='btn btn-outline-success btn-auth0-cta btn-padded btn-block' type="submit">Register</button> </td></tr>
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

export default HomePage;