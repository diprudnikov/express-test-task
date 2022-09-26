const { Op } = require('sequelize');

async function getBestProfession(start, end, models, sequelize) {
    const { Job, Contract, Profile } = models;
    const result = await Contract.findAll({
        attributes: [
            [sequelize.col('Contractor.profession'), 'profession'],
            [sequelize.fn('sum', sequelize.col('Jobs.price')), 'paid']
        ],
        include: [
            {
                model: Profile,
                as: 'Contractor',
                attributes: [],
                required: true,
            },
            {
                model: Job,
                attributes: [],
                required: true,
                where: {
                    paid: { [Op.is]: true },
                    paymentDate: { [Op.between]: [start, end] }
                }
            }
        ],
        group: [sequelize.col('Jobs.ContractId')],
        order: [['paid', 'DESC']],
    });

    return result[0];
}

async function getBestClients(start, end, limit, models, sequelize) {
    const { Job, Contract, Profile } = models;
    const result = await Contract.findAll({
        attributes: [
            ['ClientId', 'id'],
            [sequelize.literal("firstName || ' ' || lastName"), 'fullName'],
            [sequelize.fn('sum', sequelize.col('Jobs.price')), 'paid']
        ],
        include: [
            {
                model: Profile,
                as: 'Client',
                attributes: [],
                required: true,
            },
            {
                model: Job,
                attributes: [],
                required: true,
                where: {
                    paid: { [Op.is]: true },
                    paymentDate: { [Op.between]: [start, end] }
                }
            }
        ],
        group: ['Contract.ClientId'],
        order: [['paid', 'DESC']],
    });

    return result.slice(0, limit)
}

module.exports = {
    getBestClients,
    getBestProfession,
}
