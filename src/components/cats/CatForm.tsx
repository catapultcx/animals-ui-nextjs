import { Cat } from "@/domain/cat";
import { FormStatus, OnChange, OnSubmit } from "@/utils/formUtils";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface CatFormProps {
  cat: Cat;
  onSubmit: OnSubmit;
  onChange: OnChange;
}

export default function CatForm({ cat, onSubmit, onChange }: CatFormProps) {
  const [formStatus, setFormStatus] = useState(FormStatus.IDLE);

  return (
    <Form
      onSubmit={(event) => {
        setFormStatus(FormStatus.VALIDATED);
        if (event.currentTarget.checkValidity()) {
          setFormStatus(FormStatus.CONFIRM);
        }
        onSubmit(event);
      }}
      className="w-25"
      noValidate
      validated={formStatus !== FormStatus.IDLE}
    >
      <Form.Group className="mb-3">
        <Form.Label htmlFor="catName">Cat Name</Form.Label>
        <Form.Control
          id="name"
          name="name"
          value={cat.name}
          onChange={onChange}
          placeholder="Please enter a name"
          required
          autoFocus
          aria-label="cat-name"
        />
        <Form.Control.Feedback type="invalid" className="text-left">
          Please provide a name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="catDescription">Cat Description</Form.Label>
        <Form.Control
          id="description"
          name="description"
          value={cat.description}
          onChange={onChange}
          placeholder="Please enter a description"
          required
          aria-label="cat-description"
        />
        <Form.Control.Feedback type="invalid" className="text-left">
          Please provide a description.
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" className="btn btn-primary mb-2">
        Submit
      </Button>
    </Form>
  );
}
