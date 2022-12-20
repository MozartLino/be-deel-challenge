const contractRepository = (contractModelDB) => {

  const findOne = async (id) => {
    const contract = await contractModelDB.findOne({
      where: {
        id
      }
    })

    return contract
  }

  return {
    findOne
  }
}

module.exports = contractRepository