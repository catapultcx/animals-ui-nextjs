import {Cat} from '@/domain/cat'
import {CatsService} from '@/services/api/cats-service'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'

const service = new CatsService()

interface SearchBarProps {
  onSearch: Dispatch<SetStateAction<{ cats: Cat[] } | null>>
  onError: Dispatch<SetStateAction<string>>
}

export default function SearchBar({onSearch, onError}: SearchBarProps) {
  const [reset, setReset] = useState(false)
  const [validated, setValidated] = useState(false)
  const [inputValues, setInputValues] = useState({name: '', description: ''})

  const searchCats = () => {
    const name = inputValues.name
    const description = inputValues.description

    var queryParameters = []

    if (name)
      queryParameters.push(["name", name])

    if (description)
      queryParameters.push(["description", description])

    service
      .all(queryParameters)
      .then((resp: { cats: Cat[] } | null) => {
        onSearch(resp)
      })
      .catch((err) => {
        onError(err.message)
      })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (!event.currentTarget.checkValidity()) {
      setValidated(true)
      return
    }

    searchCats()

    setValidated(true)
  }

  useEffect(() => {
    if (reset) {
      searchCats()
      setReset(false)
    }
  }, [reset])

  const onReset = (event) => {
    event.preventDefault()
    event.stopPropagation()

    setInputValues({name: '', description: ''})
    setValidated(false)
    setReset(true)
  }

  const onInputChange = (event) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value
    })
  }

  return (
    <>
      <Form onSubmit={onSubmit} noValidate validated={validated}>
        <Row className={"mt-3"}>
          <Col>
            <Form.Control placeholder="Name" name="name" onChange={onInputChange} value={inputValues.name} required
                          aria-label={"Name input"}/>
            <Form.Control.Feedback type="invalid">
              Please provide a name.
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Control placeholder="Description" name="description" onChange={onInputChange}
                          value={inputValues.description} required aria-label={"Description input"}/>
            <Form.Control.Feedback type="invalid">
              Please provide a description.
            </Form.Control.Feedback>
          </Col>
          <Col sm={"auto"}>
            <Button variant="secondary" aria-label={"Reset"} type="button" className={"mb-3"}
                    onClick={(e) => onReset(e)}>
              Reset
            </Button>
          </Col>
          <Col sm={"auto"}>
            <Button variant="primary" type="submit" className={"mb-3"}>
              Filter
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}