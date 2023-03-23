import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CatsService } from "@/services/api/cats-service";
import { Cat } from "@/domain/cat";
import { Alert } from "react-bootstrap";

const service = new CatsService();

type Props = {
	editMode: boolean;
	cat?: Cat;
};

const CreateAnimalPage = ({ cat, editMode }: Props) => {
	const [catData, setCat] = useState<{ name: string; description: string }>(
		cat ? { name: cat.name, description: cat.description } : { name: "", description: "" }
	);
	const [formValidated, setFormValidated] = useState(false);
	const [catCreated, setCatCreated] = useState<boolean>(false);
	const [catUpdated, setCatUpdated] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCat({ ...catData, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;

		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			try {
				if (editMode) {
					const updatedCat: Cat = { name: catData.name, description: catData.description, group: "MAMMALS" };
					service.update({
						id: cat?.id as string,
						cat: updatedCat,
					});
					setCatUpdated(true);
				} else {
					service.create({ name: catData.name, description: catData.description });
					setCatCreated(true);
				}
				form.reset();
				setCat({ name: "", description: "" });
				setFormValidated(false);
			} catch (error) {
				setError("Something went wrong.");
				console.error(error);
			}
		}
	};

	return (
		<>
			{catCreated && (
				<Alert variant="success" onClose={() => setCatCreated(false)} dismissible>
					<Alert.Heading>Your cat has been registered.</Alert.Heading>
				</Alert>
			)}
			{catUpdated && (
				<Alert variant="success" onClose={() => setCatUpdated(false)} dismissible>
					<Alert.Heading>Your cat has been updated.</Alert.Heading>
				</Alert>
			)}
			{error && (
				<Alert variant="danger" onClose={() => setError(null)} dismissible>
					<Alert.Heading>{error}</Alert.Heading>
				</Alert>
			)}
			<div className="container my-5">
				<Form noValidate validated={formValidated} onSubmit={handleSubmit} action={`${process.env.API_URL}/cats`} method="POST">
					<Form.Group controlId="formName">
						<Form.Label>Name</Form.Label>
						<Form.Control required type="text" name="name" value={catData.name} onChange={handleInputChange} />
						<Form.Control.Feedback type="invalid">Please provide a name.</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId="formDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control required as="textarea" name="description" value={catData.description} onChange={handleInputChange} />
						<Form.Control.Feedback type="invalid">Please provide a description.</Form.Control.Feedback>
					</Form.Group>

					<Button className="mt-2" variant={editMode ? "warning" : "primary"} type="submit">
						{editMode ? "Update" : "Create Cat"}
					</Button>
				</Form>
			</div>
		</>
	);
};

export default CreateAnimalPage;
