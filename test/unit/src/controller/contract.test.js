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
    contractRepository.findContract.mockResolvedValue({ id: contractId })

    // WHEN
    await controller.getContract({ params: { id: contractId }, profile: { id: profileId } }, res)

    // THEN
    expect(contractRepository.findContract).toHaveBeenCalledWith(contractId, profileId)
    expect(res.json).toHaveBeenCalledWith({ id: contractId })
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

  it('should return a list of contract if it exists when calling getContracts', async () => {
    // GIVEN
    const profileId = '321'
    contractRepository.findActiveContractsByProfile.mockResolvedValue([{ id: '123' }])

    // WHEN
    await controller.getContracts({ profile: { id: profileId } }, res)

    // THEN
    expect(contractRepository.findActiveContractsByProfile).toHaveBeenCalledWith(profileId)
    expect(res.json).toHaveBeenCalledWith([{ id: '123' }])
  })

  it('should return a 404 if the contract does not exist when calling getContracts to a user', async () => {
    // GIVEN
    contractRepository.findContract.mockResolvedValue([])
    const res = {
      status: jest.fn(() => res),
      end: jest.fn()
    }

    // WHEN
    await controller.getContracts({ profile: { id: '321' } }, res)

    // THEN
    expect(contractRepository.findActiveContractsByProfile).toHaveBeenCalledWith('321')
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.end).toHaveBeenCalled()
  })
})
