const jobController = require('../../../../src/controller/job');

describe('getUnpaidJobs', () => {
  it('should return a list of unpaid jobs for the given profile', async () => {
    // GIVEN
    const req = { profile: { id: 123 } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };
    const jobRepository = {
      findUnpaidJobsByProfile: jest.fn(() =>
        Promise.resolve([
          { id: 1, paid: false },
          { id: 2, paid: false },
        ])
      ),
    };

    const controller = jobController(jobRepository);
    // WHEN
    await controller.getUnpaidJobs(req, res);

    // THEN
    expect(jobRepository.findUnpaidJobsByProfile).toHaveBeenCalledWith(123);
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, paid: false },
      { id: 2, paid: false },
    ]);
  });

  it('should return a 404 status if no unpaid jobs are found for the given profile', async () => {
    // GIVEN
    const jobRepository = {
      findUnpaidJobsByProfile: jest.fn(() => Promise.resolve([])),
    };
    const controller = jobController(jobRepository);
    const req = { profile: { id: 123 } };
    const res = { json: jest.fn(), status: jest.fn(() => res), end: jest.fn() };

    // WHEN
    await controller.getUnpaidJobs(req, res);

    // THEN
    expect(jobRepository.findUnpaidJobsByProfile).toHaveBeenCalledWith(123);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.end).toHaveBeenCalled();
  });

  describe('payJob', () => {
    it('should pay the job and return a 200 status', async () => {
      // GIVEN
      const jobRepository = { payJob: jest.fn() };
      const transaction = {
        commit: jest.fn(),
      };
      const sequelize = {
        transaction: () => transaction,
      };
      const res = { json: jest.fn() };
      const req = {
        params: { job_id: 123 },
        profile: { id: 456 },
      };
      const controller = jobController(jobRepository, sequelize);

      // WHEN
      await controller.payJob(req, res, transaction);

      // THEN
      expect(jobRepository.payJob).toHaveBeenCalledWith(123, 456, transaction);
      expect(transaction.commit).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ ok: 'ok' });
    });

    it('should handle errors thrown during the request', async () => {
      // GIVEN
      const jobRepository = {
        payJob: jest.fn(() => {
          throw new Error('Something went wrong');
        }),
      };
      const transaction = {
        rollback: jest.fn(),
      };
      const sequelize = {
        transaction: () => transaction,
      };
      const res = { status: jest.fn(() => res), end: jest.fn() };
      const req = {
        params: { job_id: 123 },
        profile: { id: 456 },
      };
      const controller = jobController(jobRepository, sequelize);

      // WHEN
      await controller.payJob(req, res);

      // THEN
      expect(jobRepository.payJob).toHaveBeenCalledWith(
        123,
        456,
        sequelize.transaction()
      );
      expect(transaction.rollback).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.end).toHaveBeenCalled();
    });
  });
});
