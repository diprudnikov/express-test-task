const Sequelize = require('sequelize');

module.exports = {
    name: 'Profile',
    definition: {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        profession: {
            type: Sequelize.STRING,
            allowNull: false
        },
        balance:{
            type:Sequelize.DECIMAL(12,2)
        },
        type: {
            type: Sequelize.ENUM('client', 'contractor')
        }
    }
}
