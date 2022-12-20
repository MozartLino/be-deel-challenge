const { Router } = require('express');
const authWrapper = require('../infrastructure/middleware/auth');
const jobControllerWrapper = require('../controller/job');
const dependencies = require('../infrastructure');

const jobController = jobControllerWrapper(dependencies.jobRepository);
const auth = authWrapper(dependencies.profileRepository);

const router = new Router();
router.get('/jobs/unpaid', auth, jobController.getUnpaidJobs);

module.exports = router;
