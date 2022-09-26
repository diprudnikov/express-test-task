const express = require('express');
const adminRouter = express.Router();
const AdminController = require('./controller');

adminRouter.get('/best-profession', AdminController.getBestProfession);
adminRouter.get('/best-clients', AdminController.getBestClients)

module.exports = adminRouter;
