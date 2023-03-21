import {NextApiResponse, NextApiRequest} from 'next'
import {RegisterCatService} from "@/services/api/register-cat-service";

const service = new RegisterCatService()
export default function registerHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {name, description} = req.body
    service
        .register({id: '', name: name, description: description, group: 'MAMMALS'})
        .then((resp) => {
            res.redirect(307, '/cats')
        })
        .catch((err) => {
            res.status(500).send({error: `Failed to register cat ${err}`})
        });

}