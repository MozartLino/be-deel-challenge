const { Op } = require('sequelize');
const { Contract } = require('../model');

const jobRepository = (jobModelDB) => {
  const findUnpaidJobsByProfile = async (profileId) => {
    const unpaidJobs = await jobModelDB.findAll({
      where: {
        [Op.or]: [
          {
            paid: false,
          },
          {
            paid: null,
          },
        ],
      },
      include: [
        {
          model: Contract,
          where: {
            status: 'in_progress',
            [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
          },
        },
      ],
    });

    return unpaidJobs;
  };

  return {
    findUnpaidJobsByProfile,
  };
};

module.exports = jobRepository;
