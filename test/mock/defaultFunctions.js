module.exports = {
  res: {
    json: jest.fn(),
    status: jest.fn(() => {
      return {
        end: jest.fn()
      }
    }),
    end: jest.fn(),
  },
  contractRepository: {
    findContract: jest.fn(),
    findActiveContractsByProfile: jest.fn(),
  }
}
