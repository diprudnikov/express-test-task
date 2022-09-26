const JobService = require('./service');

async function getUnpaidJobs(req, res) {
    const models = req.app.get('models');
    const contracts = await JobService.getUnpaidJobs(req.profile, models);
    if (!contracts.length) return res.status(404).end();
    res.json(contracts);
}

async function makeJobPayment(req, res) {
    const { job_id } = req.params;
    const models = req.app.get('models');
    const sequelize = req.app.get('sequelize');
    try {
        await JobService.makeJobPayment(job_id, models, sequelize)
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

module.exports = {
    getUnpaidJobs,
    makeJobPayment,
}
