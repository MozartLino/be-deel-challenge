const profileRepository = require('./repositories/profileRepository');
const contractRepository = require('./repositories/contractRepository');
const jobRepository = require('./repositories/jobRepository');

const { sequelize } = require('./model');

const profileModelDB = sequelize.models.Profile;
const contractModelDB = sequelize.models.Contract;
const jobModelDB = sequelize.models.Job;

module.exports = {
  profileRepository: profileRepository(profileModelDB),
  contractRepository: contractRepository(contractModelDB),
  jobRepository: jobRepository(jobModelDB),
};
