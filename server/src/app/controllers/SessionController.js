import * as Yup from 'yup';
import Ong from '../models/Ong';

class SessionController {
    async create(req, res) {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { id } = req.body;

        const ong = await Ong.findOne({ where: { id } });

        if (!ong) {
            return res.status(401).json({ error: 'ONG not found' });
        }

        return res.json({ name: ong.name });
    }
}

export default new SessionController();
