import {NextApiResponse, NextApiRequest} from 'next'
import {UpdateCatService} from "@/services/api/update-cat-service";

const service = new UpdateCatService();
export default function updateHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { name, description} = req.body
    const { catId } = req.query
    service
        .update({id: `${catId}`, name: name, description: description, group: 'MAMMALS'})
        .then((resp) => {
            res.redirect(307, '/cats')
        })
        .catch((err) => {
            res.status(500).send({error: `Failed to update cat ${catId} with error ${err}`})
        });

}