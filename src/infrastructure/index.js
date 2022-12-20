const profileRepository = require('./repositories/profileRepository');
const contractRepository = require('./repositories/contractRepository');
const { sequelize } = require('./model');

const profileModelDB = sequelize.models.Profile;
const contractModelDB = sequelize.models.Contract;

module.exports = {
  profileRepository: profileRepository(profileModelDB),
  contractRepository: contractRepository(contractModelDB),
};
