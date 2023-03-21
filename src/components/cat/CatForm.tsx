import { Cat } from '@/domain/cat'
import { FormState, OnCancel, OnChange, OnSubmit } from './CatFormActions'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

interface CatFormProps {
  cat: Cat
  onSubmit: OnSubmit
  onChange: OnChange
  onCancel: OnCancel
}

export default function CatForm ({ cat, onSubmit, onChange, onCancel }: CatFormProps) {
  const [ formState, setFormState ] = useState(FormState.INITIAL)

  return (
    <Form
      onSubmit={ (event) => {
        setFormState(FormState.READY_FOR_VALIDATION)
        if (event.currentTarget.checkValidity()) {
          setFormState(FormState.SUBMITTED)
        }
        onSubmit(event)
      } }
      className="w-25"
      validated={ formState !== FormState.INITIAL }
      noValidate
    >
      <Form.Group className="mb-3">
        <Form.Label htmlFor="name">Cat name</Form.Label>
        <Form.Control
          id="name"
          name="name"
          value={ cat.name }
          onChange={ onChange }
          placeholder="Cat name"
          required
          autoFocus
        />
        <Form.Control.Feedback type="invalid" className="text-left">Cat name is required</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="description">Cat description</Form.Label>
        <Form.Control
          id="description"
          name="description"
          value={ cat.description }
          onChange={ onChange }
          placeholder="Cat description"
          required
        />
        <Form.Control.Feedback type="invalid" className="text-left">Cat description is required</Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" className="btn btn-success">
        Save
      </Button>
      <Button type="button" className="btn btn-secondary ms-3" onClick={ (event) => {
        setFormState(FormState.INITIAL)
        onCancel(event)
      } }>
        Cancel
      </Button>
    </Form>
  )
}
