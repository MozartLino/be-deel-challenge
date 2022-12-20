const contractRepository = require('../../../../../src/infrastructure/repositories/contractRepository')
const { Op } = require('sequelize')

describe('contractRepository', () => {
  it('should query the database with the correct parameters when calling the findContract method', async () => {
    // GIVEN
    const contractModelDB = {
      findOne: jest.fn(() => Promise.resolve({ id: 1 }))
    }
    const repo = contractRepository(contractModelDB)

    // WHEN
    const result = await repo.findContract(1, 1)

    // THEN
    expect(result).toEqual({ id: 1 })
    expect(contractModelDB.findOne).toHaveBeenCalledWith({
      where: {
        id: 1,
        [Op.or]: [{
          ClientId: 1,
        },
        {
          ContractorId: 1,
        }],
      }
    })
  })

  it('should query the database with the correct parameters when calling the findActiveContractsByProfile method', async () => {
    // GIVEN
    const contractModelDB = {
      findAll: jest.fn(() => Promise.resolve({ id: 1 }))
    }
    const repo = contractRepository(contractModelDB)

    // WHEN
    const result = await repo.findActiveContractsByProfile(1)

    // THEN
    expect(result).toEqual({ id: 1 })
    expect(contractModelDB.findAll).toHaveBeenCalledWith({
      where: {
        [Op.not]: {
          status: 'terminated',
        },
        [Op.or]: [{
          ClientId: 1,
        },
        {
          ContractorId: 1,
        }],
      }
    })
  })
})
