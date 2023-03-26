import Head from "next/head"
import { DefaultCat } from "@/domain/cat"
import CatForm from "@/components/CatForm"

export default function NewCatPage() {
    return (
        <>
            <Head>
                <title>Register Cat</title>
                <meta name="description" content="Register Cat" />
            </Head>
            <main>
                <h1>Register Cat</h1>
                <CatForm cat={DefaultCat} action="/api/cats/create" />
            </main>
        </>
    )
}
