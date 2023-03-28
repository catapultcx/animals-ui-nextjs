import Head from "next/head";
import { Cat } from "@/domain/cat";
import CatForm from "@/components/CatForm";
import CloseButton from "react-bootstrap/CloseButton";
import Router from "next/router";

export default function AddCat({ cat }: { cat: Cat }) {
  const addData = { id: "", name: "", description: "" };
  return (
    <>
      <Head>
        <title>Add your cat</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="d-flex justify-content-between">
          <h1>Add your cat</h1>
          <CloseButton
            onClick={() => Router.push("/cats")}
            aria-label="Close"
          />
        </div>
        <CatForm cat={addData} mode={1} />
      </main>
    </>
  );
}
