const { Router } = require('express');
const authWrapper = require('../infrastructure/middleware/auth');
const contractControllerWrapper = require('../controller/contract');
const dependencies = require('../infrastructure');

const contractController = contractControllerWrapper(
  dependencies.contractRepository
);
const auth = authWrapper(dependencies.profileRepository);

const router = new Router();
router.get('/contracts/:id', auth, contractController.getContract);
router.get('/contracts', auth, contractController.getContracts);

module.exports = router;
