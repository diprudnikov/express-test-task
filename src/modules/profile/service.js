const { Op } = require('sequelize');
const { CONTRACT_STATUS, ERROR_MESSAGES } = require('../../shared/constants');

async function makeDeposit(userId, deposit, models, sequelize) {
    const { Profile, Contract, Job } = models;
    const client = await Profile.findOne({ where: { id: userId } });
    const [{ amountToPay }] = await Contract.findAll({
        attributes: [
            sequelize.col('ClientId'),
            [sequelize.fn('sum', sequelize.col('Jobs.price')), 'amountToPay']
        ],
        raw: true,
        where: {
            ClientId: client.id,
            status: CONTRACT_STATUS.IN_PROGRESS
        },
        include: [
            {
                model: Job,
                attributes: [],
                required: true,
                where: {
                    paid: {
                        [Op.not]: true
                    }
                }
            }
        ],
        group: [sequelize.col('ClientId')]
    })
    if (deposit > amountToPay * 0.25) throw new Error(ERROR_MESSAGES.DEPOSIT);
    return sequelize.transaction(async (t) => {
        await Profile.update(
            { balance: client.balance + deposit },
            { where: { id: client.id } },
            { transaction: t }
        );
    });
}

module.exports = {
    makeDeposit,
}
