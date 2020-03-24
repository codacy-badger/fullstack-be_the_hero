import * as Yup from 'yup';

import Incident from '../models/Incident';
import Ong from '../models/Ong';

class IncidentController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const { count } = await Incident.findAndCountAll();

        const ongs = await Incident.findAll({
            limit: 5,
            offset: (page - 1) * 5,
            include: [
                {
                    model: Ong,
                    as: 'ong',
                    attributes: [
                        'id',
                        'name',
                        'email',
                        'whatsapp',
                        'city',
                        'uf',
                    ],
                },
            ],
        });

        res.header('X-Total-Count', count);

        return res.json(ongs);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required(),
            value: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const checkOngExists = await Ong.findOne({
            where: { id: req.headers.authorization },
        });

        if (!checkOngExists) {
            return res.status(400).json({ error: 'Ong does not exist!' });
        }

        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const { id } = await Incident.create({
            title,
            description,
            value,
            ong_id,
        });

        return res.json({ id, title, description, value, ong_id });
    }

    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await Incident.findOne({
            where: {
                id,
            },
        });

        if (incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operation not permitted.' });
        }

        await Incident.destroy({
            where: {
                id,
            },
        });

        return res.status(204).send();
    }
}

export default new IncidentController();
