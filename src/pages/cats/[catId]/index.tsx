import Head from "next/head";
import { Cat } from "@/domain/cat";
import { Table } from "react-bootstrap";
import { CatsService } from "@/services/api/cats-service";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { update } from "cypress/types/lodash";
import { NewCatForm } from "@/components/NewCatForm";

const service = new CatsService();

export default function CatPage({ cat }: { cat: Cat }) {
  const [updateInfo, setUpdatedInfo] = useState(false);

  const openForm = () => {
    setUpdatedInfo(true);
  };

  return (
    <>
      <Head>
        <title>Your cat {cat.name}</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {(!updateInfo && (
        <main>
          <h1>Your cat {cat.name}</h1>
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
          <Button variant="contained" color="success" onClick={openForm}>
            Update Cat Information
          </Button>
        </main>
      )) ||
        (updateInfo && <NewCatForm />)}
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
