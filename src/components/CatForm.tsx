import { ChangeEvent, useState } from "react";
import Router from "next/router";
import { Cat } from "@/domain/cat";
import { Button, Form } from "react-bootstrap";
import { CatsService } from "@/services/api/cats-service";

const service = new CatsService();

export default function CatForm({ cat, mode }: { cat: Cat; mode: number }) {
  const [catData, setCatData] = useState<Cat>(cat);
  const [validated, setValidated] = useState(false);

  const handleSave = async (event: {
    currentTarget: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity()) {
      try {
        if (mode === 2) {
          await service.update(catData.id, catData);
        } else {
          await service.add(catData);
        }
        Router.back();
      } catch (err) {
        console.log(err);
        return { notFound: true };
      }
    } else {
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name: catName, value } = event.target;
    setCatData({ ...catData, [catName]: value });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSave}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            name="name"
            placeholder="Enter cat name"
            autoFocus
            required
            onChange={handleChange}
            defaultValue={catData.name || ""}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
          onChange={handleChange}
        >
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            required
            defaultValue={catData.description || ""}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </>
  );
}
