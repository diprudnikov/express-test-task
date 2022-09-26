const AdminService = require('./service');

async function getBestProfession(req, res) {
    const { start, end } = req.query;
    const models = req.app.get('models');
    const sequelize = req.app.get('sequelize');
    try {
        const bestProfession = await AdminService.getBestProfession(start, end, models, sequelize);
        res.json(bestProfession);
    }
    catch (error) {
        console.log(error);
        res.status(404).end();
    }
}

async function getBestClients(req, res) {
    const { start, end, limit = 2 } = req.query;
    const models = req.app.get('models');
    const sequelize = req.app.get('sequelize');
    try {
        const bestClients = await AdminService.getBestClients(start, end, limit, models, sequelize)
        res.json(bestClients);
    }
    catch (error) {
        console.log(error);
        res.status(404).end();
    }
}

module.exports = {
    getBestClients,
    getBestProfession,
}
