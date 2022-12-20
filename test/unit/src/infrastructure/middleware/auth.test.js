const AuthWrapper = require('../../../../../src/infrastructure/middleware/auth');

const next = jest.fn();
const profileRepository = {
  findOne: jest.fn(),
};
const req = {
  get: jest.fn(() => 1),
};
const auth = AuthWrapper(profileRepository);

describe('authProfile', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should sets profile on request and calls next when profile found', async () => {
    profileRepository.findOne.mockResolvedValue({ id: 1 });

    await auth(req, {}, next);

    expect(req.profile).toEqual({ id: 1 });
    expect(next).toHaveBeenCalled();
  });

  it('returns 401 when profile not found', async () => {
    profileRepository.findOne.mockResolvedValue(null);

    const res = {
      status: jest.fn(() => res),
      end: jest.fn(),
    };

    await auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.end).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
