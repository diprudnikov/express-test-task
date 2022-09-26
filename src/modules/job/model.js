const Sequelize = require('sequelize');

module.exports = {
    name: 'Job',
    definition: {
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        price:{
            type: Sequelize.DECIMAL(12,2),
            allowNull: false
        },
        paid: {
            type: Sequelize.BOOLEAN,
            default:false
        },
        paymentDate:{
            type: Sequelize.DATE
        }
    }
}
