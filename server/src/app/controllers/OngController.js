import * as Yup from 'yup';
import Ong from '../models/Ong';

class OngController {
    async index(req, res) {
        const ongs = await Ong.findAll();

        return res.json(ongs);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            whatsapp: Yup.string().required(),
            city: Yup.string().required(),
            uf: Yup.string().max(2),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const OngExists = await Ong.findOne({
            where: { name: req.body.name },
        });

        if (OngExists) {
            return res.status(401).json({ error: 'Ong already registered' });
        }

        const { id, name, email, whatsapp, city, uf } = await Ong.create(
            req.body
        );

        return res.json({ id, name, email, whatsapp, city, uf });
    }
}

export default new OngController();
