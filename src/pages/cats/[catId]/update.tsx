import Head from 'next/head'
import {Cat} from '@/domain/cat'
import CatForm from "@/components/CatForm";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import {UpdateCatService} from "@/services/api/update-cat-service";
import {CatsService} from "@/services/api/cats-service";

const catsService = new CatsService()
const service = new UpdateCatService()
export default function UpdateCatPage({ cat } : {cat: Cat}) {

    const router = useRouter();
    const updateCat = (cat: Cat) => {
        service
            .update(cat)
            .then((resp) => {
                toast(`Cat with id ${resp?.id} has been updated successfully `, {type: "success"});
                router.push("/cats");
            })
            .catch((err) => {
                toast(`Failed to update cat with error ${err}`, {type: "error"});
            });
    };

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
                <CatForm cat={cat} onSubmit={updateCat}/>
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