import Sequelize, { Model } from 'sequelize';
import { randomBytes } from 'crypto';

class Ong extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                whatsapp: Sequelize.STRING,
                city: Sequelize.STRING,
                uf: Sequelize.STRING,
            },
            { sequelize }
        );

        this.addHook('beforeSave', async ong => {
            ong.id = randomBytes(4).toString('HEX');
        });

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.Incident, {
            through: 'incident_id',
        });
    }
}

export default Ong;
