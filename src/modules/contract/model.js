const Sequelize = require('sequelize');

module.exports = {
    name: 'Contract',
    definition: {
        terms: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        status:{
            type: Sequelize.ENUM('new','in_progress','terminated')
        }
    }
}
