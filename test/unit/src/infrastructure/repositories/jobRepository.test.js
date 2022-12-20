const { Op } = require('sequelize');
const {
  Contract,
  Profile,
} = require('../../../../../src/infrastructure/model');
const jobRepository = require('../../../../../src/infrastructure/repositories/jobRepository');

const findOneJobMock = {
  Contract: {
    Client: {
      balance: 1000,
      decrement: jest.fn(),
    },
    Contractor: {
      balance: 0,
      increment: jest.fn(),
    },
  },
  price: 500,
  update: jest.fn(),
};
const jobModelDB = {
  findAll: jest.fn(() =>
    Promise.resolve([
      { id: 1, paid: false },
      { id: 2, paid: false },
    ])
  ),
  findOne: jest.fn(async () => findOneJobMock),
};

describe('findUnpaidJobsByProfile', () => {
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
          as: 'Contract',
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

describe('payJob', () => {
  it('should pay the job and update the accounts and job', async () => {
    // GIVEN
    const transaction = { commit: jest.fn() };
    const repository = jobRepository(jobModelDB);

    // WHEN
    await repository.payJob(123, 456, transaction);

    // THEN
    expect(jobModelDB.findOne).toHaveBeenCalledWith(
      {
        where: {
          id: 123,
          [Op.or]: [
            {
              paid: false,
            },
            {
              paid: null,
            },
          ],
        },
        include: [
          {
            as: 'Contract',
            include: [
              {
                as: 'Client',
                model: Profile,
              },
              {
                as: 'Contractor',
                model: Profile,
              },
            ],
            model: Contract,
            where: {
              ClientId: 456,
              status: 'in_progress',
            },
          },
        ],
      },
      {
        transaction,
      }
    );
    expect(findOneJobMock.Contract.Client.decrement).toHaveBeenCalledWith(
      'balance',
      { by: 500 },
      { transaction }
    );
    expect(findOneJobMock.Contract.Contractor.increment).toHaveBeenCalledWith(
      'balance',
      { by: 500 },
      { transaction }
    );
    expect(findOneJobMock.update).toHaveBeenCalledWith(
      { paid: true, paymentDate: expect.any(Date) },
      { transaction }
    );
  });

  it('should throw an error if the job is not found', async () => {
    // GIVEN
    const repository = jobRepository({ findOne: jest.fn(() => null) });

    // WHEN
    const payNotFoundJobPromise = repository.payJob(123, 456, {});

    // THEN
    await expect(() => payNotFoundJobPromise).rejects.toThrow(
      'TODO not found error'
    );
  });

  it('should throw an error if the Client does not have sufficient balance', async () => {
    const mockFindOne = jest.fn(() =>
      Promise.resolve({
        Contract: {
          Client: {
            balance: 100,
            decrement: jest.fn(),
          },
          Contractor: {
            balance: 0,
            increment: jest.fn(),
          },
        },
        price: 500,
        update: jest.fn(),
      })
    );

    const repository = jobRepository({ findOne: mockFindOne });

    const doesNotHaveSufficientBalancePromise = repository.payJob(123, 456, {});
    await expect(doesNotHaveSufficientBalancePromise).rejects.toThrow(
      'The Client does not have sufficient balance'
    );
  });
});
