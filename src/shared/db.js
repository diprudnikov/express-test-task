const Sequelize = require('sequelize');
const { dbConfig } = require('./config');
const { modelConfigs: { profileModel, contractModel, jobModel } } = require('../modules');

const sequelize = new Sequelize(dbConfig);

class Profile extends Sequelize.Model {}
Profile.init(
    profileModel.definition,
  {
    sequelize,
    modelName: 'Profile'
  }
);

class Contract extends Sequelize.Model {}
Contract.init(
    contractModel.definition,
  {
    sequelize,
    modelName: contractModel.name
  }
);

class Job extends Sequelize.Model {}
Job.init(
  jobModel.definition,
  {
    sequelize,
    modelName: jobModel.name
  }
);

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' })
Contract.belongsTo(Profile, { as: 'Contractor' })

Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' })
Contract.belongsTo(Profile, { as: 'Client' })

Contract.hasMany(Job)
Job.belongsTo(Contract)

module.exports = {
  sequelize,
  Profile,
  Contract,
  Job
};
