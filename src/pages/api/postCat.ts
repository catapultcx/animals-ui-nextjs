import {NextApiRequest, NextApiResponse} from "next";
import {CatsService} from "@/services/api/cats-service";

const service = new CatsService()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, description } = req.body
  try {
    const cat = await service.post({
      name,
      description
    })
    res.status(200).json(cat)
  } catch (e) {
    res.status(500).json({})
  }

}
