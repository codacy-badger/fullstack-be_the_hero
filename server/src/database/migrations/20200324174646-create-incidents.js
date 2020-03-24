module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('incidents', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },

            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            value: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },

            ong_id: {
                type: Sequelize.STRING,
                references: { model: 'ongs', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('incidents');
    },
};
