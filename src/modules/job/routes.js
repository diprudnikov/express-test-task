const express = require('express');
const jobRouter = express.Router();
const JobController = require('./controller');

jobRouter.get('/unpaid', JobController.getUnpaidJobs);
jobRouter.post('/:job_id/pay', JobController.makeJobPayment)

module.exports = jobRouter;
