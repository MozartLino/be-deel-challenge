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
});
