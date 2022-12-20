const repositories = require('../../../../src/infrastructure');

describe('Repositories', () => {
  it('should create a profileRepository', () => {
    expect(repositories.profileRepository.findOne).toBeInstanceOf(Function);
  });

  it('should create a contractRepository', () => {
    expect(repositories.contractRepository.findOne).toBeInstanceOf(Function);
  });
});
