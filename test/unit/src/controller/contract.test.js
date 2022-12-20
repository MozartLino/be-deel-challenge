const contractController = require('../../../../src/controller/contract')
const { res, contractRepository } = require('../../../mock/defaultFunctions')

describe('contractController', () => {

  const controller = contractController(contractRepository)

  beforeEach(() => {
    jest.resetAllMocks();
  })

  it('should return a contract if it exists', async () => {
    // GIVEN
    const id = '123'
    contractRepository.findOne.mockResolvedValue({ id })

    // WHEN
    await controller.getContract({ params: { id } }, res)

    // THEN
    expect(contractRepository.findOne).toHaveBeenCalledWith(id)
    expect(res.json).toHaveBeenCalledWith({ id })
  })

  it('should return a 404 if the contract does not exist', async () => {
    contractRepository.findOne.mockResolvedValue(null)
    const res = {
      status: jest.fn(() => res),
      end: jest.fn()
    }

    await controller.getContract({ params: { id: '123' } }, res)

    expect(contractRepository.findOne).toHaveBeenCalledWith('123')
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.end).toHaveBeenCalled()
  })
})
