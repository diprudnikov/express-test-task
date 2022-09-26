const ProfileService = require('./service');

async function makeDeposit(req, res) {
    const { userId } = req.params;
    const { deposit } = req.body;
    const models = req.app.get('models');
    const sequelize = req.app.get('sequelize');
    try {
        await ProfileService.makeDeposit(userId, deposit, models, sequelize);
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

module.exports = {
    makeDeposit,
}
