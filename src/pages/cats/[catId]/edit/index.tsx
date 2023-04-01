'use client';

import { Button, Form } from 'react-bootstrap';
import { CatsService } from '@/services/api/cats-service';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Cat } from '@/domain/cat';

const service = new CatsService();

export default function EditCat({ cat }: { cat: Cat }) {
  const [name, setName] = useState(cat.name);
  const [description, setDescription] = useState(cat.description);
  const router = useRouter();

  const handleOnEdit = async (e: any) => {
    e.preventDefault();
    cat.name = name;
    cat.description = description;
    console.log(`Updating.. ${JSON.stringify(cat)}`);

    const result = await service.update(cat);
    console.log(result);
    if (result) {
      router.push('/');
    }
  };

  return (
    <>
      <Head>
        <title>Edit Cat</title>
        <meta name="description" content="Create a cat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <h1>Edit Cat</h1>
          <br />
          <Form>
            <Form.Group className="mb-2" controlId="formCatName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-testid="name"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formCatDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                data-testid="description"
              />
            </Form.Group>

            <br />
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleOnEdit(e)}
            >
              Edit
            </Button>
          </Form>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const cat = await service.get({ id: context?.params?.catId });
    console.log(cat);

    return { props: { cat } };
  } catch (err) {
    console.log(err);
    return { notFound: true };
  }
}
