const { sequelize, Profile, Contract, Job } = require('../../../../src/infrastructure/model');

describe('Profile model', () => {

  it('creates a new profile', async () => {
    const profile = await Profile.create({
      firstName: 'John',
      lastName: 'Doe',
      profession: 'Developer',
    });
    expect(profile.firstName).toBe('John');
    expect(profile.lastName).toBe('Doe');
    expect(profile.profession).toBe('Developer');
  });

  it('should require a first name', async () => {
    try {
      await Profile.create({
        lastName: 'Doe',
        profession: 'developer',
      });
    } catch (error) {
      expect(error.name).toEqual('SequelizeValidationError');
      expect(error.errors[0].path).toEqual('firstName');
      expect(error.errors[0].message).toEqual('Profile.firstName cannot be null');
    }
  });

  it('should require a last name', async () => {
    try {
      await Profile.create({
        firstName: 'John',
        profession: 'developer',
      });
    } catch (error) {
      expect(error.name).toEqual('SequelizeValidationError');
      expect(error.errors[0].path).toEqual('lastName');
      expect(error.errors[0].message).toEqual('Profile.lastName cannot be null');
    }
  });
});

jest.mock('sequelize', () => {
  const Sequelize = jest.requireActual('sequelize');
  Sequelize.Model.hasMany = jest.fn();
  Sequelize.Model.belongsTo = jest.fn();
  return Sequelize;
});

describe('Model relationships', () => {
  it('Profile has many Contracts as a Contractor', () => {
    expect(Profile.hasMany).toHaveBeenCalledWith(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
  });

  it('Contract belongs to a Profile as a Contractor', () => {
    expect(Contract.belongsTo).toHaveBeenCalledWith(Profile, { as: 'Contractor' });
  });

  it('Profile has many Contracts as a Client', () => {
    expect(Profile.hasMany).toHaveBeenCalledWith(Contract, { as: 'Client', foreignKey: 'ClientId' });
  });

  it('Contract belongs to a Profile as a Client', () => {
    expect(Contract.belongsTo).toHaveBeenCalledWith(Profile, { as: 'Client' });
  });

  it('Contract has many Jobs', () => {
    expect(Contract.hasMany).toHaveBeenCalledWith(Job);
  });

  it('Job belongs to a Contract', () => {
    expect(Job.belongsTo).toHaveBeenCalledWith(Contract);
  });
});
