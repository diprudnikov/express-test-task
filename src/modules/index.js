const contractRouter = require('./contract/routes');
const jobRouter = require('./job/routes');
const profileRouter = require('./profile/routes');
const adminRouter = require('./admin/routes');

const contractModel = require('./contract/model');
const jobModel = require('./job/model');
const profileModel = require('./profile/model');


const modelConfigs = {
    contractModel,
    jobModel,
    profileModel
};

const routes = [
    {
        path: '/contracts',
        router: contractRouter,
    },
    {
        path: '/jobs',
        router: jobRouter,
    },
    {
        path: '/profiles',
        router: profileRouter,
    },
    {
        path: '/admin',
        router: adminRouter,
    }
];

module.exports = {
    routes,
    modelConfigs,
}
