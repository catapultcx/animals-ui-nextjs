import Head from 'next/head'
import CatForm from "@/components/CatForm";

export default function RegisterCatPage() {


    const newCat = {id: '', name: '', description: '', group: 'MAMMALS'};

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
                <CatForm cat={newCat} formAction='/api/cats/register'/>
            </main>
        </>
    )
}
