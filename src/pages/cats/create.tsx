import Head from "next/head";
import CatComp from "@/components/cats/CatComp";

export default function CreateCatPage() {
  return (
    <>
      <Head>
        <title>Create a cat</title>
      </Head>
      <main>
        <h1>Create a new Cat</h1>
        <CatComp />
      </main>
    </>
  );
}
