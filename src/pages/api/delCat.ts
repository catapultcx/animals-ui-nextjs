import {NextApiRequest, NextApiResponse} from "next";
import {CatsService} from "@/services/api/cats-service";

const service = new CatsService()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body
  try {
    await service.delete({ id })
    res.status(204).end()
  } catch (e) {
    res.status(500).end()
  }
}
