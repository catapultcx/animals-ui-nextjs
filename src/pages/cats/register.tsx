import { CatsService } from "@/services/api/cats-service";
import { FormEvent, useState } from "react";
import { Cat } from "@/domain/cat";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button, Col, Form, Row } from "react-bootstrap";
import Link from "next/link";

const service = new CatsService();
export default function Register() {

    const router = useRouter();

    const [submitted, setSubmitted] = useState<boolean>(false);

    const [form, setForm] = useState<Cat>({
        id: "",
        name: "",
        description: "",
        group: "MAMMALS"
    });

    const setField = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value
        });
    }

    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
        if (form.name && form.description) {
            await service.create(form);
            await router.push("/cats");
        }
    }

    return (
        <>
            <Head>
                <title>Register new cat</title>
                <meta name="description" content="Register your animal"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <h1>Register new cat</h1>
                <Form role="form" onSubmit={submitHandler} noValidate validated={submitted}>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Enter your cat name"
                                      required
                                      value={form.name}
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
                                      value={form.description}
                                      onChange={(e) => setField("description", e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide your cat description.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row className="mb-3">
                        <Col>
                            <Link href="/cats" role="button">
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
