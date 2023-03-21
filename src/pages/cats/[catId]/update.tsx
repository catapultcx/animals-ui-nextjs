import Head from 'next/head'
import {Cat} from '@/domain/cat'
import CatForm from "@/components/CatForm";
import {CatsService} from "@/services/api/cats-service";

const catsService = new CatsService()
export default function UpdateCatPage({ cat } : {cat: Cat}) {

    return (
        <>
            <Head>
                <title>Update Cat {cat.id}</title>
                <meta name="description" content="Update cat"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <h1>Update Cat {cat.id}</h1>
                <CatForm cat={cat} formAction={`/api/cats/${cat.id}/update`}/>
            </main>
        </>
    )
}

export async function getServerSideProps(context: any) {
    try {
        const cat = await catsService.get({ id: context?.params?.catId })
        return { props: { cat } }
    } catch (err) {
        console.log(err)
        return { notFound: true }
    }
}