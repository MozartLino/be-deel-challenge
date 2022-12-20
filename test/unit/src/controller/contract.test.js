const contractController = require('../../../../src/controller/contract')
const { res, contractRepository } = require('../../../mock/defaultFunctions')

describe('contractController', () => {

  const controller = contractController(contractRepository)

  beforeEach(() => {
    jest.resetAllMocks();
  })

  it('should return a contract if it exists', async () => {
    // GIVEN
    const contractId = '123'
    const profileId = '321'
    contractRepository.findContract.mockResolvedValue({ id })

    // WHEN
    await controller.getContract({ params: { id: contractId }, profile: { id: profileId } }, res)

    // THEN
    expect(contractRepository.findContract).toHaveBeenCalledWith(contractId, profileId)
    expect(res.json).toHaveBeenCalledWith({ id })
  })

  it('should return a 404 if the contract does not exist', async () => {
    const contractId = '123'
    const profileId = '321'
    contractRepository.findContract.mockResolvedValue(null)
    const res = {
      status: jest.fn(() => res),
      end: jest.fn()
    }

    await controller.getContract({ params: { id: contractId }, profile: { id: profileId } }, res)

    expect(contractRepository.findContract).toHaveBeenCalledWith(contractId, profileId)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.end).toHaveBeenCalled()
  })
})
