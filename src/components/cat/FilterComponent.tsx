import { Cat } from '@/domain/cat'
import { CatsService } from '@/services/api/cats-service'
import { OnSubmit } from '@/components/cat/CatFormActions'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

const service = new CatsService()

interface FilterComponentProps {
  onFilter: (cats: { cats: Cat[] } | null) => void
}

export default function FilterComponent ({ onFilter }: FilterComponentProps) {
  const [ query, setQuery ] = useState('')

  const onSubmit: OnSubmit = (event) => {
    event.preventDefault()
    filter()
  }

  const filter = () => {
    service
      .filter({ query })
      .then((resp) => {
        onFilter(resp)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Form onSubmit={ onSubmit }>
      <Row>
        <Col>
          <Form.Control
            id="query"
            name="query"
            aria-label="query"
            value={ query }
            onChange={ (e) => setQuery(e.target.value) }
            placeholder="Filter"
          />
        </Col>
        <Col>
          <Button type="submit" className="btn btn-primary">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
