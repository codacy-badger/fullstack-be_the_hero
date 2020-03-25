import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import Ong from '../models/Ong';
import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
    async create(req, res) {
        /**
         * Verify if the login is made by an NGO
         */
        if (req.originalUrl.split('/')[1] === 'ongs') {
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

            return res.json({
                ong: true,
                name: ong.name,
                token: jwt.sign({ id }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn,
                }),
            });
        }

        /**
         * If the URL does not contains /ongs/, the Login will be made by an User
         */
        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res
                .status(401)
                .json({ error: 'Email or password incorrect' });
        }

        if (!(await user.checkPassword(password))) {
            return res
                .status(401)
                .json({ error: 'Email or password incorrect' });
        }

        const { id, name, birthday } = user;

        return res.json({
            user: {
                id,
                name,
                birthday,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
