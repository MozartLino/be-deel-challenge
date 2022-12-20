const contractRepository = require('../../../../../src/infrastructure/repositories/contractRepository')

describe('contractRepository', () => {
  it('findOne should query the database with the correct parameters', async () => {
    // GIVEN
    const contractModelDB = {
      findOne: jest.fn(() => Promise.resolve({ id: 1 }))
    }
    const repo = contractRepository(contractModelDB)

    // WHEN
    const result = await repo.findOne(1)

    // THEN
    expect(result).toEqual({ id: 1 })
    expect(contractModelDB.findOne).toHaveBeenCalledWith({
      where: {
        id: 1
      }
    })
  })
})
