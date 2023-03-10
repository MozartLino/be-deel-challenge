const isEmptyArray = require('../utils/isEmptyArray');

const contractController = (contractRepository) => {
  const getContract = async (req, res) => {
    const { id: contractId } = req.params;
    const { id: profileId } = req.profile;

    const contract = await contractRepository.findContract(
      contractId,
      profileId
    );

    if (!contract) {
      return res.status(404).end();
    }

    return res.json(contract);
  };

  const getContracts = async (req, res) => {
    const { id: profileId } = req.profile;
    const contracts =
      await contractRepository.findNonTerminatedContractsByProfile(profileId);

    if (isEmptyArray(contracts)) {
      return res.status(404).end();
    }

    return res.json(contracts);
  };

  return {
    getContract,
    getContracts,
  };
};

module.exports = contractController;
