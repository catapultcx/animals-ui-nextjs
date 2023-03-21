import { CatsService } from '@/services/api/cats-service'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import React, {useState} from 'react'
import { useRouter } from "next/router"

const service = new CatsService()

export const enum SaveMode {
  CREATE
}

interface CatFormProps {
  mode: SaveMode
}

export default function CatForm( {mode}: CatFormProps ) {
  const [errorMessage, setErrorMessage] = useState('')

  const [validated, setValidated] = useState(false)

  const [newCat, setNewCat] = useState({ id: '', name: '', description: '', group: 'MAMMALS' })

  const router = useRouter()

  const onChange = (event) => {
    setNewCat({
      ...newCat,
      [event.target.name]: event.target.value
    })
  }

  const createCat = () => {
    service
      .post( { cat: newCat })
      .then(() => {
        router.push('/cats')
      })
      .catch((err) => {
        setErrorMessage(err.message)
      })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (!event.currentTarget.checkValidity()) {
      setValidated(true)
      return
    }

    switch (mode) {
      case SaveMode.CREATE:
        createCat()
        setValidated(true)
        break
    }
  }

  return (
    <div>
      <Alert variant={'danger'} dismissible show={errorMessage.length != 0} onClose={() => setErrorMessage('')}>
        <Alert.Heading>
          An error occurred
        </Alert.Heading>
        <p>
          {errorMessage}
        </p>
      </Alert>
      <Form className={'p-10'} noValidate validated={validated} onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" onChange={onChange} required aria-label={'Name input'}/>
          <Form.Control.Feedback type="invalid">
            Please provide a name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" name="description" onChange={onChange} required aria-label={'Description input'}/>
          <Form.Control.Feedback type="invalid">
            Please provide a description.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" className={'mb-3'}>
          Submit
        </Button>
      </Form>
    </div>
  )
}