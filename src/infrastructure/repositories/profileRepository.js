const profileRepository = (profileModelDB) => {

  const findOne = async (id) => {
    const profile = await profileModelDB.findOne({
      where: {
        id
      }
    })

    return profile
  }

  return {
    findOne
  }
}

module.exports = profileRepository