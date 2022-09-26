const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./shared/db');
const { getProfile } = require('./modules/profile/middleware/getProfile')
const { routes } = require('./modules');

const app = express();

app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);
app.use(getProfile);

routes.forEach(({ path, router }) => {
    app.use(path, router)
});

/**
 * endpoint for test purposes
**/
app.get('/all', async (req, res) => {
    const { Job, Contract, Profile } = req.app.get('models');
    const result = await Promise.all([Job.findAll(), Contract.findAll(), Profile.findAll()]);
    res.json(result);
});

module.exports = app;
