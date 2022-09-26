const { Op } = require('sequelize');
const { PROFILE_ID_MAP, CONTRACT_STATUS } = require('../../shared/constants');

async function getContractById(contractId, profile, models) {
    const { Contract } = models;
    return Contract.findOne({
        where: {
            id: contractId,
            [PROFILE_ID_MAP[profile.type]]: profile.id
        }
    })
}

async function getContracts(profile, models) {
    const { Contract } = models;
    return Contract.findAll({
        where: {
            [PROFILE_ID_MAP[profile.type]]: profile.id,
            status: {
                [Op.not]: CONTRACT_STATUS.TERMINATED
            }
        }
    });
}

module.exports = {
    getContractById,
    getContracts,
};
