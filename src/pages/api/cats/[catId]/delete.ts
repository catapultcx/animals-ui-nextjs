import {NextApiResponse, NextApiRequest} from 'next'
import {DeleteCatService} from "@/services/api/delete-cat-service";

const service = new DeleteCatService();
export default function deleteHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { catId } = req.query
    service
        .delete(`${catId}`)
        .then((resp) => {
            res.redirect(307, '/cats')
        })
        .catch((err) => {
            res.status(500).send({error: `Failed to delete cat ${catId} with error ${err}`})
        });

}