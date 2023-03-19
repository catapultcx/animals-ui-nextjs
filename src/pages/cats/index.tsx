import Head from "next/head";
import { Cat } from "@/domain/cat";
import { Table } from "react-bootstrap";
import { CatsService } from "@/services/api/cats-service";
import Link from "next/link";
import { Alert, Button, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const service = new CatsService();

export default function CatsPage({ cats }: any) {
  const [catsChanged, setCatsChanged] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    setCatsChanged(false);
  }, [cats]);

  const router = useRouter();

  const handleDelete = (catId: any) => {
    service.remove(catId);
    router.push(router.asPath);
    setCatsChanged(true);
    setOpenSnackBar(true);
  };

  const handleClose = () => {
    setOpenSnackBar(false);
  };

  const openForm = () => {
    router.push("/submitForm");
  };

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
                    <Link
                      href={`/cats/${c.id}`}
                      className="btn btn-primary btn-auth0-cta btn-padded"
                    >
                      View
                    </Link>
                  </td>
                  <td>
                    <Button
                      onClick={() => handleDelete(c.id)}
                      variant="contained"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                    <Snackbar
                      open={openSnackBar}
                      autoHideDuration={10000}
                      onClose={handleClose}
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                      <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                      >
                        The Cat is Permanently deleted !!!
                      </Alert>
                    </Snackbar>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={openForm}
            style={{ marginLeft: "50px", marginRight: "50px" }}
          >
            Add Cat
          </Button>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const cats = await service.all();
    return { props: { cats } };
  } catch (err) {
    console.log(err);
    return { notFound: true };
  }
}
