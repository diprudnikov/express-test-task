const ContractService = require('./service');

async function getContractById(req, res) {
    const models = req.app.get('models');
    const { id } = req.params;
    const contract = await ContractService.getContractById(id, req.profile, models);
    if (!contract) return res.status(404).end();
    res.json(contract);
}

async function getContracts(req, res) {
    const models = req.app.get('models');
    const { profile } = req;
    const contracts = await ContractService.getContracts(profile, models);
    if (!contracts.length) return res.status(404).end();
    res.json(contracts);
}

module.exports = {
    getContractById,
    getContracts,
};
