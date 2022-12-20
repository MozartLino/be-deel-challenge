const contractRepository = require('../../../../../src/infrastructure/repositories/contractRepository')
const { Op } = require('sequelize')

describe('contractRepository', () => {
  it('findOne should query the database with the correct parameters', async () => {
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
})
