import Head from "next/head";
import { Cat } from "@/domain/cat";
import { Alert, Button, Form, Table } from "react-bootstrap";
import { CatsService } from "@/services/api/cats-service";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const service = new CatsService();

export default function CatsPage({ cats }: any) {
	const [catsData, setCatsData] = useState<Cat[]>(cats);
	const [catDeleted, setCatDeleted] = useState<boolean>(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const router = useRouter();

	const handleNameSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCatsData((prev) => prev.filter((cat) => cat.name === name));
		// router.replace({ pathname: "/cats/search", query: { name } });
	};

	const handleDescriptionSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCatsData((prev) => prev.filter((cat) => cat.description === description));
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

	const handleResetFilters = () => {
		setCatsData(cats);
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

				<Button variant="success" className="mb-2" type="submit" onClick={handleResetFilters}>
					Reset Filters
				</Button>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Description</th>
							<th>View</th>
							<th>Delete</th>
							<th>Update</th>
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
									<td>
										<Link href={`/cats/update`} className="btn btn-warning btn-auth0-cta btn-padded" type="submit">
											Update
										</Link>
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
		const { name, description } = context.query;
		let cats: { cats: Cat[] } | null = null;

		if (name) {
			cats = await service.search({ name: name as string });
		} else if (description) {
			cats = await service.search({ description: description as string });
		} else {
			cats = await service.all();
		}

		return { props: { cats } };
	} catch (err) {
		console.log(err);
		return { notFound: true };
	}
}
