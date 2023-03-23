import Head from "next/head";
import { Cat } from "@/domain/cat";
import { Alert, Button, Form, Table } from "react-bootstrap";
import { CatsService } from "@/services/api/cats-service";
import Link from "next/link";
import { useState } from "react";

const service = new CatsService();

export default function CatsPage({ cats }: any) {
	const [catsData, setCatsData] = useState<Cat[]>(cats);
	const [catDeleted, setCatDeleted] = useState<boolean>(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const handleNameSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(`search ${name}`);
	};

	const handleDescriptionSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(`search ${description}`);
	};

	const handleDelete = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const id = formData.get("id");

		try {
			service.delete(id as string);
			setCatsData((prev) => prev.filter((cat) => cat.id !== id));
			setCatDeleted(true);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Head>
				<title>View your cats</title>
				<meta name="description" content="Register your animal" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<h1>View your cats</h1>
				{catDeleted && (
					<Alert variant="success" onClose={() => setCatDeleted(false)} dismissible>
						<Alert.Heading>Your cat has been deleted.</Alert.Heading>
					</Alert>
				)}

				<Form onSubmit={handleNameSearch} className="mb-4">
					<Form.Group controlId="formBasicName">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
					</Form.Group>
					<Button variant="primary" className="mt-2" type="submit">
						Search by Name
					</Button>
				</Form>
				<Form onSubmit={handleDescriptionSearch} className="mb-4">
					<Form.Group controlId="formBasicDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Form.Group>
					<Button variant="primary" className="mt-2" type="submit">
						Search by Description
					</Button>
				</Form>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Description</th>
							<th>View</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{catsData?.length > 0 &&
							catsData.map((c: Cat) => (
								<tr key={c.id}>
									<td>{c.id}</td>
									<td>{c.name}</td>
									<td>{c.description}</td>
									<td>
										<Link href={`/cats/${c.id}`} className="btn btn-primary btn-auth0-cta btn-padded">
											View
										</Link>
									</td>
									<td>
										<form onSubmit={handleDelete}>
											<input type="hidden" name="id" value={c.id} />
											<Button className="btn btn-danger btn-auth0-cta btn-padded" type="submit">
												Delete
											</Button>
										</form>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			</main>
		</>
	);
}

export async function getServerSideProps(context: any) {
	try {
		const cats = await service.all();
		return { props: { cats } };
	} catch (err) {
		console.log(err);
		return { notFound: true };
	}
}
