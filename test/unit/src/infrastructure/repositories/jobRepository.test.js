const { Op } = require('sequelize');
const { Contract } = require('../../../../../src/infrastructure/model');
const jobRepository = require('../../../../../src/infrastructure/repositories/jobRepository');

describe('findUnpaidJobsByProfile', () => {
  const jobModelDB = {
    findAll: jest.fn(() =>
      Promise.resolve([
        { id: 1, paid: false },
        { id: 2, paid: false },
      ])
    ),
  };

  it('should return a list of unpaid jobs for the given profile', async () => {
    const repository = jobRepository(jobModelDB);

    const unpaidJobs = await repository.findUnpaidJobsByProfile(123);

    expect(jobModelDB.findAll).toHaveBeenCalledWith({
      where: {
        [Op.or]: [{ paid: false }, { paid: null }],
      },
      include: [
        {
          model: Contract,
          where: {
            status: 'in_progress',
            [Op.or]: [{ ClientId: 123 }, { ContractorId: 123 }],
          },
        },
      ],
    });

    expect(unpaidJobs).toEqual([
      { id: 1, paid: false },
      { id: 2, paid: false },
    ]);
  });
});
