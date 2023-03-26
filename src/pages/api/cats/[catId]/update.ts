import { NextApiRequest, NextApiResponse } from "next"
import { CatsService } from "@/services/api/cats-service"

const service = new CatsService()

export default async function updateHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { catId } = req.query
    const { name, description } = req.body

    if (typeof catId !== 'string') {
        return res.status(400).json({ error: 'catId must be a string' });
    }

    try {
        await service.update( {
            id: catId,
            cat: {
                id: catId,
                name,
                description,
                group: "MAMMALS",
            },
        })

        return res.redirect(307, `/cats/${catId}`)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Failed to update cat ${catId} ${err}` })
    }
}
