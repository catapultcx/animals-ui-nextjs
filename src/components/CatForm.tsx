import {Button, Form} from "react-bootstrap";
import {Cat} from "@/domain/cat";
import {useState} from "react";

interface CatFormProps {
    cat: Cat;
    formAction : string;
}

export default function CatForm({cat, formAction}: CatFormProps) {

    const [localCat, updateCat] = useState<Cat>(cat);

    const onChange = ({target}: any) => {
        const {name, value} = target;
        updateCat((prevState: Cat) => {
            return {...prevState, [name]: value};
        });
    };

    return (
        <Form action={formAction} method='POST' aria-label='cat-form' noValidate>
            <Form.Group className='mb-3'>
                <Form.Label htmlFor='name'>Name:</Form.Label>
                <Form.Control name='name' value={localCat.name} onChange={onChange} placeholder='Enter cat name'
                              required aria-label='name'>
                </Form.Control>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label htmlFor='description'>Description:</Form.Label>
                <Form.Control name='description' value={localCat.description} onChange={onChange}
                              placeholder='Enter cat description' required
                              aria-label='description'>
                </Form.Control>
            </Form.Group>

            <Button type="submit" className="btn btn-primary btn-auth0-cta btn-padded float-end mb-3">
                Submit
            </Button>
        </Form>
    );
}