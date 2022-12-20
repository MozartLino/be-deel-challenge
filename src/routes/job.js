const { Router } = require('express');
const authWrapper = require('../infrastructure/middleware/auth');
const jobControllerWrapper = require('../controller/job');
const dependencies = require('../infrastructure');
const { sequelize } = require('../infrastructure/model');

const jobController = jobControllerWrapper(
  dependencies.jobRepository,
  sequelize
);
const auth = authWrapper(dependencies.profileRepository);

const router = new Router();
router.get('/jobs/unpaid', auth, jobController.getUnpaidJobs);
router.post('/jobs/:job_id/pay', auth, jobController.payJob);

module.exports = router;
