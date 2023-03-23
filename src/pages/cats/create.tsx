import Head from "next/head";
import { Cat } from "@/domain/cat";
import { Table } from "react-bootstrap";
import { CatsService } from "@/services/api/cats-service";
import CatForm from "../../components/CatForm";
import Link from "next/link";

export default function CatsPage({ cats }: any) {
	return (
		<>
			<Head>
				<title>Register your cat</title>
				<meta name="description" content="Register your animal" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<h1>Register your cat</h1>
				<CatForm editMode={false} />
			</main>
		</>
	);
}
