import Head from 'next/head'
import {Cat} from '@/domain/cat'
import CatForm from "@/components/CatForm";
import {RegisterCatService} from "@/services/api/register-cat-service";
import {useRouter} from "next/router";
import {toast} from "react-toastify";

const service = new RegisterCatService()
export default function RegisterCatPage() {

    const router = useRouter();

    const newCat = {id: '', name: '', description: '', group: 'MAMMALS'};

    const registerCat = (cat: Cat) => {
        service
            .register(cat)
            .then((resp) => {
                toast(`Cat registered successfully with id ${resp?.id}`, {type: "success"});
                router.push("/cats");
            })
            .catch((err) => {
                toast(`Failed to register cat with error ${err}`, {type: "error"});
            });
    };

    return (
        <>
            <Head>
                <title>Register New Cat</title>
                <meta name="description" content="Register new cat"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <h1>Register New Cat</h1>
                <CatForm cat={newCat} onSubmit={registerCat}/>
            </main>
        </>
    )
}
