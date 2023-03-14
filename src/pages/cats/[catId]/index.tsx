import Head from "next/head";
import { Cat } from "@/domain/cat";
import { Button, Table } from "react-bootstrap";
import { CatsService } from "@/services/api/cats-service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const service = new CatsService();

export default function CatPage({ cat }: { cat: Cat }) {
  const router = useRouter();

  const deleteCat = (id: string) => {
    service
      .delete({ id })
      .then((resp) => {
        toast("Cat deleted successfully!", { type: "success" });
        router.push("/cats");
      })
      .catch((err) => {
        toast("Error occured. Please try again later.", { type: "error" });
      });
  };

  return (
    <>
      <Head>
        <title>Your cat {cat.name}</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
        <Button
          onClick={() => router.push(`update/${cat.id}`)}
          className="btn btn-success"
        >
          Edit
        </Button>
        <Button
          onClick={() => deleteCat(cat.id)}
          className="btn btn-danger m-2"
        >
          Delete
        </Button>
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
