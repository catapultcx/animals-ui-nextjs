import {NextApiRequest, NextApiResponse} from "next";
import {CatsService} from "@/services/api/cats-service";

const service = new CatsService()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, description, id } = req.body
  try {
    const cat = await service.update({
      name,
      description,
      id
    })
    res.status(200).json(cat)
  } catch (e) {
    res.status(500).json({})
  }

}
