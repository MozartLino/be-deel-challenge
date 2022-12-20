const { Op } = require('sequelize');

const contractRepository = (contractModelDB) => {
  /**
   * Finds a contract in the database by contract ID and profile ID.
   *
   * @param {number} contractId - The ID of the contract to find.
   * @param {number} profileId - The ID of the profile associated with the contract.
   * @returns {Promise<Contract>} A promise that resolves with the found contract, or `null` if no matching contract was found.
   */
  const findContract = async (contractId, profileId) => {
    const contract = await contractModelDB.findOne({
      where: {
        id: contractId,
        [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      },
    });

    return contract;
  };

  /**
   * Finds contracts in the database by profile ID.
   *
   * @param {number} profileId - The ID of the profile associated with the contract.
   * @returns {Promise<Array<Contract>>} A promise that resolves with the found contracts, or `[]` if no matching contract was found.
   */
  const findNonTerminatedContractsByProfile = async (profileId) => {
    const contracts = await contractModelDB.findAll({
      where: {
        [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
        [Op.not]: { status: 'terminated' },
      },
    });

    return contracts;
  };

  return {
    findNonTerminatedContractsByProfile,
    findContract,
  };
};

module.exports = contractRepository;
