import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";

interface  FilterProps {
    onFilter: any
}
export default function Filter({onFilter} : FilterProps) {

    const [text, setText] = useState('');

    const onChange = ({target}: any) => {
        setText(target.value)
    };

    return (
        <Form onSubmit={event => {
            event.preventDefault();
            onFilter(text);
        }} noValidate>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Control name='text' value={text} onChange={onChange}
                                      placeholder='Enter text to filter cat by name or description'
                                      required aria-label='text'>
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