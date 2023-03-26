import { NextApiRequest, NextApiResponse } from "next"
import { CatsService } from "@/services/api/cats-service"

const service = new CatsService()

export default async function createHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { name, description } = req.body

    try {
        await service.create({
            cat: {
                name,
                description,
                group: "MAMMALS",
            },
        })

        return res.redirect(307, "/cats")
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Failed to create cat ${err}` })
    }
}
