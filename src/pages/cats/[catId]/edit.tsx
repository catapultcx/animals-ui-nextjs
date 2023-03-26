import Head from "next/head"
import {Cat} from "@/domain/cat"
import CatForm from "@/components/CatForm"
import { CatsService } from '@/services/api/cats-service'
import React from "react";

interface EditCatPageProps {
    cat: Cat
}

const service = new CatsService()

export default function EditCatPage({cat} : EditCatPageProps) {
    return (
        <>
            <Head>
                <title>Edit Cat</title>
                <meta name="description" content="Update cat information" />
            </Head>
            <main>
                <h1>Edit cat {cat.name}</h1>
                <CatForm cat={cat} action={`/api/cats/${cat.id}/update`} />
            </main>
        </>
    )
}

export async function getServerSideProps(context: any) {
    try {
        const cat = await service.get({ id: context?.params?.catId })
        return { props: { cat } }
    } catch (err) {
        console.log(err)
        return { notFound: true }
    }
}