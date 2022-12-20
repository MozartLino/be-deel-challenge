const contractController = (contractRepository) => {

  const getContract = async (req, res) => {
    const { id: contractId } = req.params;
    const { id: profileId } = req.profile;

    const contract = await contractRepository.findContract(contractId, profileId);

    if (!contract) {
      return res.status(404).end();
    }

    return res.json(contract);
  };

  return {
    getContract,
  };
};

module.exports = contractController;
