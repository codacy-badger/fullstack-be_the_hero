import Sequelize, { Model } from 'sequelize';
import generateUniqueId from '../../utils/GenerateUniqueId';

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
            ong.id = generateUniqueId();
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
