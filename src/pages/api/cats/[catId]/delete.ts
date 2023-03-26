import {NextApiResponse, NextApiRequest} from 'next'
import {CatsService} from "@/services/api/cats-service";

const service = new CatsService();
export default async function deleteHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {catId} = req.query
    if (typeof catId !== 'string') {
        return res.status(400).json({ error: 'catId must be a string' });
    }

    try {
        await service.delete({id: catId});
        return res.redirect(307, '/cats');
    } catch (err) {
        return res.status(500).json({error: `Failed to delete cat ${catId} ${err}`});
    }
}