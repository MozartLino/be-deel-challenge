const contractController = (contractRepository) => {
  /**
   * FIX ME!
   * @returns contract by id
   */
  const getContract = async (req, res) => {
    const { id } = req.params;

    const contract = await contractRepository.findOne(id);

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
