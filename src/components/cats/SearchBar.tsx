import { Cat } from "@/domain/cat";
import { CatsService } from "@/services/api/cats-service";
import { OnSubmit } from "@/utils/formUtils";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";

const service = new CatsService();

interface SearchBarProps {
  onSearch: (cats: { cats: Cat[] } | null) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit: OnSubmit = (event) => {
    event.preventDefault();
    search();
  };

  const search = () => {
    service
      .find({ name, description })
      .then((resp) => {
        onSearch(resp);
      })
      .catch((err) => {
        toast("Error occured. Please try again later.", { type: "error" });
      });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <Col>
          <Form.Control
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Cat name"
            aria-label="cat-name"
          />
        </Col>
        <Col>
          <Form.Control
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Cat description"
            aria-label="cat-description"
          />
        </Col>
        <Col>
          <Button type="submit" className="btn btn-primary mb-2">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
