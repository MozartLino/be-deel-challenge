const authWrapper = (profileRepository) => {
  const getprofileIdFrom = (req) => req.get('profile_id') || 0;

  return async (req, res, next) => {
    const id = getprofileIdFrom(req);
    const profile = await profileRepository.findOne(id);

    if (!profile) {
      return res.status(401).end();
    }

    req.profile = profile;
    next();
  };
};

module.exports = authWrapper;
