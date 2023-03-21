import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";

export default function Filter() {

    const [filter, setText] = useState('');

    const onChange = ({target}: any) => {
        setText(target.value)
    };

    return (
        <Form action={`/cats?filter=${filter}`} aria-label='filter-form' noValidate>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Control name='filter' value={filter} onChange={onChange}
                                      placeholder='Enter text to filter cat by name or description'
                                      required aria-label='filter'>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>

                    <Button type="submit" className="btn btn-primary btn-auth0-cta btn-padded mb-3">
                        Filter
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}