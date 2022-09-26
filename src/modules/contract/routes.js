const express = require('express');
const contractRouter = express.Router();
const ContractController = require('./controller');

contractRouter.get('/:id', ContractController.getContractById);
contractRouter.get('/', ContractController.getContracts)

module.exports = contractRouter;
