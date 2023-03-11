import React, { useEffect, useState } from 'react'
import { Cat } from '@/domain/cat'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface EditorProps {
    animal?: Cat,
    onSave: (name:string, description:string)=>Promise<void>
}
const Editor = (props: EditorProps) => {
    const {animal, onSave} = props;

    const [state, setState ]=  useState({name:'', description:''});
    useEffect(()=>{
        if(animal){
            setState({name: animal.name, description:animal.description});
        }
    }, [animal])
    // Some basic validationb
    const isValid = (): boolean=>{
        return (state.name && state.name.trim().length > 0 ) 
        && (state.description && state.description.trim().length > 0) 
        ? true : false;
    };
    return <>
        <Form onSubmit={async (e)=>{
            e.preventDefault();
            if(isValid()){
                await onSave(state.name, state.description);
            }
        }}>
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="name-input">Name</Form.Label>
                <Form.Control as="input" 
                    id="name-input"
                    placeholder="Enter a name" 
                    value={state.name}
                    onChange={(e)=>{
                            setState({...state, name:e.target.value});
                    }} 
                    />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="description-input">Description</Form.Label>
                <Form.Control as="textarea" 
                    id="description-input"
                    value={state.description}
                    aria-label="description"
                    onChange={(e)=>{
                        setState({...state, description:e.target.value});
                     }} 
                />
            </Form.Group>
            <Button variant="primary" disabled={!isValid()}
                    type="submit">
                Save
            </Button>
        </Form>
    </>
}
    


export default Editor
