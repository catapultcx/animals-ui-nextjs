import {Button, Col, Form, Row} from "react-bootstrap"
import {useRouter} from "next/router"
import {FormEvent} from "react"

export function Filter() {
    const router = useRouter()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const formData = new FormData(event.currentTarget)
            const queryParams = new URLSearchParams()
            const name = formData.get("name") as string
            const description = formData.get("description") as string
            queryParams.append("name", name)
            queryParams.append("description", description)
            await router.push(`/cats?${queryParams.toString()}`)
        } catch (error: unknown) {
            console.error(error)
        }
    }

    return (
        <Form action={`/cats`} onSubmit={handleSubmit}>
            <Row className="align-items-center">
                <Col xs="auto">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                    </Form.Label>
                    <Form.Control
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Filter by name"
                        name="name"
                        aria-label="name"
                    />
                </Col>
                <Col xs="auto">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Description
                    </Form.Label>
                    <Form.Control
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Filter by description"
                        name="description"
                        aria-label="description"
                    />
                </Col>
                <Col xs="auto">
                    <Button type="submit" className="mb-2">
                        Filter
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}
