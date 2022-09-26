const { Op } = require('sequelize');
const { PROFILE_ID_MAP, CONTRACT_STATUS, ERROR_MESSAGES } = require('../../shared/constants');

async function getUnpaidJobs(profile, models) {
    const { Job, Contract } = models;
    return Job.findAll({
        where: {
            paid: {
                [Op.not]: true
            }
        },
        include: [
            {
                model: Contract,
                required: true,
                attributes: [],
                where: {
                    [PROFILE_ID_MAP[profile.type]]: profile.id,
                    status: {
                        [Op.is]: CONTRACT_STATUS.IN_PROGRESS
                    }
                }
            }
        ]
    });
}

async function makeJobPayment(jobId, models, sequelize) {
    const { Job, Contract, Profile } = models;
    const job = await Job.findOne({ where: { id: jobId }});
    const contract = await Contract.findOne({ where: { id: job.ContractId } })
    const [client, contractor] = await Promise.all([
        Profile.findOne({ where: { id: contract.ClientId }}),
        Profile.findOne({ where: { id: contract.ContractorId }})
    ]);
    if (!job.paid) throw new Error(ERROR_MESSAGES.JOB_PAID);
    if (client.balance >= job.price) throw new Error(ERROR_MESSAGES.CLIENT_BALANCE);
    return sequelize.transaction(async (t) => {
        return Promise.all([
            Profile.update(
                { balance: client.balance - job.price },
                { where: { id: client.id } },
                { transaction: t }
            ),
            Profile.update(
                { balance: contractor.balance + job.price },
                { where: { id: contractor.id } },
                { transaction: t }
            ),
            Job.update(
                { paid: true, paymentDate: new Date().toISOString() },
                { where: { id: job.id } },
                { transaction: t }
            ),
        ]);
    });
}

module.exports = {
    getUnpaidJobs,
    makeJobPayment,
}
