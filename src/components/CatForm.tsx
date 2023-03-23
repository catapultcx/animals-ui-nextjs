import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CatsService } from "@/services/api/cats-service";
import { Cat } from "@/domain/cat";
import { Alert } from "react-bootstrap";

const service = new CatsService();

const CreateAnimalPage = () => {
	const [cat, setCat] = useState<{ name: string; description: string }>({ name: "", description: "" });
	const [formValidated, setFormValidated] = useState(false);
	const [catCreated, setCatCreated] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCat({ ...cat, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;

		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			try {
				service.create({ name: cat.name, description: cat.description });
				form.reset();
				setCat({ name: "", description: "" });
				setCatCreated(true);
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
			{error && (
				<Alert variant="danger" onClose={() => setError(null)} dismissible>
					<Alert.Heading>{error}</Alert.Heading>
				</Alert>
			)}
			<div className="container my-5">
				<Form noValidate validated={formValidated} onSubmit={handleSubmit} action={`${process.env.API_URL}/cats`} method="POST">
					<Form.Group controlId="formName">
						<Form.Label>Name</Form.Label>
						<Form.Control required type="text" name="name" value={cat.name} onChange={handleInputChange} />
						<Form.Control.Feedback type="invalid">Please provide a name.</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId="formDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control required as="textarea" name="description" value={cat.description} onChange={handleInputChange} />
						<Form.Control.Feedback type="invalid">Please provide a description.</Form.Control.Feedback>
					</Form.Group>

					<Button className="mt-2" variant="primary" type="submit">
						Create Animal
					</Button>
				</Form>
			</div>
		</>
	);
};

export default CreateAnimalPage;
