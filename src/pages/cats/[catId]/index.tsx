import Head from "next/head";
import router from "next/router";
import { Cat } from "@/domain/cat";
import { Table, Button } from "react-bootstrap";
import { CloseButton } from "react-bootstrap";
import { CatsService } from "@/services/api/cats-service";
import { useState } from "react";
import CatForm from "@/components/CatForm";

const service = new CatsService();

export default function CatPage({ cat }: { cat: Cat }) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>{isEdit ? "Edit your cat" : `View your ${cat.name}`}</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="d-flex justify-content-between ">
          <h1>{isEdit ? "Edit your cat" : `View your ${cat.name}`}</h1>
          <div className="d-flex align-middle">
            <Button
              variant="link"
              onClick={() => setIsEdit(true)}
              disabled={isEdit}
            >
              <svg
                id="i-compose"
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
                <path d="M27 15 L27 30 2 30 2 5 17 5 M30 6 L26 2 9 19 7 25 13 23 Z M22 6 L26 10 Z M9 19 L13 23 Z" />
              </svg>
              Edit cat
            </Button>
            <CloseButton className="mt-3" onClick={() => router.back()} />
          </div>
        </div>

        {isEdit ? (
          <CatForm cat={cat} mode={2} />
        ) : (
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>ID</td>
                <td>{cat.id}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{cat.name}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{cat.description}</td>
              </tr>
            </tbody>
          </Table>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const cat = await service.get({ id: context?.params?.catId });
    return { props: { cat } };
  } catch (err) {
    console.log(err);
    return { notFound: true };
  }
}
