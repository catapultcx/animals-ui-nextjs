import Head from "next/head";
import { Cat } from "@/domain/cat";
import { CatsService } from "@/services/api/cats-service";
import { FormEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

const service = new CatsService()

export default function Edit({ cat } : {cat: Cat}) {

    const router = useRouter();

    const [catForm, setCatForm] = useState<Cat>(cat);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const setField = (field: string, value: string) => {
        setCatForm({
            ...catForm,
            [field]: value
        });
    }

    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
        if (catForm.name && catForm.description) {
            await service.update(catForm);
            await router.push(`/cats/${cat.id}`);
        }
    }

    return (
        <>
            <Head>
                <title>Edit cat</title>
                <meta name="description" content="Register your animal"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <h1>Edit cat {catForm.name}</h1>
                <Form role="form" onSubmit={submitHandler} noValidate validated={submitted}>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Enter your cat name"
                                      required
                                      value={catForm.name}
                                      onChange={(e) => setField("name", e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a cat name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Enter you cat description"
                                      required
                                      value={catForm.description}
                                      onChange={(e) => setField("description", e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide your cat description.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row className="mb-3">
                        <Col>
                            <Link href={`/cats/${cat.id}`} role="button">
                                <Button variant="light" className="pull-right">Cancel</Button>
                            </Link>
                        </Col>
                        <Col className="text-end">
                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Form>
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
