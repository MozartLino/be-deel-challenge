const profileRepository = require('../../../../../src/infrastructure/repositories/profileRepository');

describe('profileRepository', () => {
  const profileModelDB = {
    findOne: jest.fn(() => Promise.resolve({ id: 1 })),
  };

  it('findOne should query the database with the correct parameters', async () => {
    const repo = profileRepository(profileModelDB);

    const result = await repo.findOne(1);

    expect(result).toEqual({ id: 1 });
    expect(profileModelDB.findOne).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });
});
