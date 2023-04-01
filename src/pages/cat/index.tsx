import Head from 'next/head';
import { Cat } from '@/domain/cat';
import { Button, Form, Table } from 'react-bootstrap';
import { CatsService } from '@/services/api/cats-service';
import { useState } from 'react';
import { useRouter } from 'next/router';

const service = new CatsService();

export default function CreateCatPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleCreate = async () => {
    console.log(name, description);

    const created = await service.create(name, description);
    if (created) {
      router.push('/');
    }
  };

  return (
    <>
      <Head>
        <title>Create Cat</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Create Cat</h1>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter cat name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              data-testid="name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Enter cat description"
              onChange={(e) => setDescription(e.target.value)}
              data-testid="description"
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={handleCreate}>
            Create
          </Button>
        </Form>
      </main>
    </>
  );
}
