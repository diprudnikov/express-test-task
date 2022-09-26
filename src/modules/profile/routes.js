const express = require('express');
const profileRouter = express.Router();
const ProfileController = require('./controller');

profileRouter.post('/balances/deposit/:userId', ProfileController.makeDeposit);

module.exports = profileRouter;
