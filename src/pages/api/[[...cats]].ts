import { CatsService } from "@/services/api/cats-service";
import type { NextApiRequest, NextApiResponse } from "next";

const service = new CatsService();

/**
 * I used NExt API because of client sides request.
 * I hide my backend from client for security
 * */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const queryString = req.url?.split("?")[1] || "";
        const response = await service.getCatsByFilter(queryString);
        res.status(200).json(response);
    } else if (req.method === "POST") {
        const response = await service.create(req.body);
        res.status(200).json(response);
    } else if (req.method === "PUT") {
        const response = await service.update(req.body);
        res.status(200).json(response);
    } else if (req.method === "DELETE") {
        const catId = req.url?.split("/")[3];
        if (catId) {
            const response = await service.delete(catId);
            res.status(200).json(response);
        }
        res.status(400);
    }
}
