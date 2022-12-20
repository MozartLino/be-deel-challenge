const isEmptyArray = require('../utils/isEmptyArray');

const jobController = (jobRepository, sequelize) => {
  const getUnpaidJobs = async (req, res) => {
    const { id: profileId } = req.profile;

    const jobs = await jobRepository.findUnpaidJobsByProfile(profileId);

    if (isEmptyArray(jobs)) {
      return res.status(404).end();
    }

    return res.json(jobs);
  };

  const payJob = async (req, res) => {
    const { job_id: jobId } = req.params;
    const { id: profileId } = req.profile;
    const transaction = await sequelize.transaction();

    try {
      await jobRepository.payJob(jobId, profileId, transaction);
      await transaction.commit();

      return res.json({ ok: 'ok' });
    } catch (error) {
      await transaction.rollback();

      return res.status(500).end();
    }
  };

  return {
    getUnpaidJobs,
    payJob,
  };
};

module.exports = jobController;
