const isEmptyArray = require('../utils/isEmptyArray');

const jobController = (jobRepository) => {
  const getUnpaidJobs = async (req, res) => {
    const { id: profileId } = req.profile;

    const jobs = await jobRepository.findUnpaidJobsByProfile(profileId);

    if (isEmptyArray(jobs)) {
      return res.status(404).end();
    }

    return res.json(jobs);
  };

  return {
    getUnpaidJobs,
  };
};

module.exports = jobController;
