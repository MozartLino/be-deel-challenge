const { Op } = require('sequelize');
const { Contract, Profile } = require('../model');

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
          as: 'Contract',
          where: {
            status: 'in_progress',
            [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
          },
        },
      ],
    });

    return unpaidJobs;
  };

  const createFindJobQuery = (jobId, profileId) => ({
    where: {
      id: jobId,
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
        as: 'Contract',
        where: {
          ClientId: profileId,
          status: 'in_progress',
        },
        include: [
          {
            model: Profile,
            as: 'Client',
          },
          {
            model: Profile,
            as: 'Contractor',
          },
        ],
      },
    ],
  });

  const payJob = async (jobId, profileId, transaction) => {
    const job = await jobModelDB.findOne(
      {
        ...createFindJobQuery(jobId, profileId),
      },
      { transaction }
    );

    if (!job) {
      throw new Error('TODO not found error');
    }

    const { Client: fromAccount } = job.Contract;
    const { Contractor: toAccount } = job.Contract;
    const amount = job.price;

    if (fromAccount.balance < amount) {
      throw new Error('The Client does not have sufficient balance');
    }

    await fromAccount.decrement('balance', { by: amount }, { transaction });
    await toAccount.increment('balance', { by: amount }, { transaction });
    await job.update({ paid: true, paymentDate: new Date() }, { transaction });
  };

  return {
    payJob,
    findUnpaidJobsByProfile,
  };
};

module.exports = jobRepository;
