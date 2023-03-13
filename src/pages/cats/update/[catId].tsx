import Head from "next/head";
import { CatsService } from "@/services/api/cats-service";
import CatComp from "@/components/cats/CatComp";
import { Cat } from "@/domain/cat";
import { Suspense } from "react";
import Loading from "./loading";

const service = new CatsService();

export default function UpdateCatPage({ cat }: { cat: Cat }) {
  return (
    <>
      <Head>
        <title>Update your cat</title>
      </Head>
      <main>
        <h1>Update your Cat info</h1>
        <Suspense fallback={<Loading />}>
          <CatComp cat={cat} />
        </Suspense>
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
