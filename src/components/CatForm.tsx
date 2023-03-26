import {Button, Form} from "react-bootstrap"
import {Cat} from "@/domain/cat"
import Link from "next/link"
import React, {FormEvent} from "react"
import {useRouter} from "next/router"

interface CatFormProps {
    cat: Cat
    action: string
}

export function CatForm({cat, action}: CatFormProps) {
    const router = useRouter()
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const formData = new FormData(event.currentTarget)
            const body = JSON.stringify(Object.fromEntries(formData));

            await fetch(action, {
                method: "POST",
                body,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })

            await router.push("/cats")
        } catch (error: unknown) {
            console.error(error)
        }
    }

    return (
        <Form action={action} method="POST" onSubmit={handleSubmit} className="mb-3">
            <Form.Group className="mb-3">
                <Form.Label htmlFor="name">Name:</Form.Label>
                <Form.Control
                    name="name"
                    aria-label="name"
                    defaultValue={cat.name}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="description">Description:</Form.Label>
                <Form.Control
                    name="description"
                    aria-label="description"
                    defaultValue={cat.description}
                    required
                />
            </Form.Group>

            <Button type="submit" variant="primary">
                Submit
            </Button>

            <Link href="/cats" className="btn btn-outline-secondary m-2">
                Cancel
            </Link>
        </Form>
    )
}

export default CatForm