import Head from 'next/head';
import { CatsService } from '@/services/api/cats-service';
import CatComponent from '@/components/cat/CatComponent';
import { Cat } from '@/domain/cat';
import { Suspense } from 'react';

const service = new CatsService();

export default function EditCatPage ({ cat }: { cat: Cat }) {
  return (
    <>
      <Head>
        <title>Edit Cat details</title>
      </Head>
      <main>
        <h1>Edit Cat details</h1>
        <Suspense>
          <CatComponent cat={ cat }/>
        </Suspense>
      </main>
    </>
  );
}

export async function getServerSideProps (context: any) {
  try {
    const cat = await service.get({ id: context?.params?.catId });
    return { props: { cat } };
  } catch (err) {
    console.log(err);
    return { notFound: true };
  }
}
