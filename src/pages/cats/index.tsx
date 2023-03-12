import Head from "next/head";
import { Cat } from "@/domain/cat";
import {
  Table,
  Button,
  Modal,
  InputGroup,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { CatsService } from "@/services/api/cats-service";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const service = new CatsService();

export default function CatsPage({ cats }: { cats: Cat[] }) {
  const router = useRouter();
  const searchString = router?.query?.search || "";
  const [show, setShow] = useState(false);
  const [selectedCat, setSelectedCat] = useState<any>(null);

  const handleDelete = async () => {
    await service.delete(selectedCat?.id);
    handleClose();
    refreshData();
  };

  const refreshData = () => {
    location.reload();
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <Head>
        <title>View your cats</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>View your cats</h1>
        <div>
          <Row>
            <Col>
              <Form>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Search here"
                    name="search"
                    defaultValue={searchString}
                  />
                  <Button variant="secondary" type="submit">
                    Seach
                  </Button>
                  <Link href="/cats" className="btn btn-outline-secondary">
                    Clear
                  </Link>
                </InputGroup>
              </Form>
            </Col>
            <Col>
              <div className="d-flex flex-row-reverse">
                <Link
                  href="/cats/add"
                  className="btn btn-primary btn-auth0-cta btn-padded"
                >
                  <svg
                    id="i-plus"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentcolor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="5"
                  >
                    <path d="M16 2 L16 30 M2 16 L30 16" />
                  </svg>
                  Add cat
                </Link>
              </div>
            </Col>
          </Row>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cats?.length > 0 &&
              cats.map((c: Cat) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <Link
                        href={`/cats/${c.id}`}
                        className="btn btn-primary btn-auth0-cta btn-padded"
                      >
                        <svg
                          id="i-eye"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentcolor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <circle cx="17" cy="15" r="1" />
                          <circle cx="16" cy="16" r="6" />
                          <path d="M2 16 C2 16 7 6 16 6 25 6 30 16 30 16 30 16 25 26 16 26 7 26 2 16 2 16 Z" />
                        </svg>
                        View
                      </Link>

                      <Button
                        variant="danger"
                        className=""
                        onClick={() => {
                          setSelectedCat(c);
                          setShow(true);
                        }}
                      >
                        <svg
                          id="i-trash"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentcolor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" />
                        </svg>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="alert alert-danger">{`Are you sure you want to delete your cat '${selectedCat?.name}' ?`}</div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const { search = "" } = context?.query || {};
    const cats = await service.all(search);
    return { props: { cats } };
  } catch (err) {
    console.log(err);
    return { notFound: true };
  }
}
