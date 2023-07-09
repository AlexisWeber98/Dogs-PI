const { Dog, Temperament, Dog_Temperament } = require('../db');
const getDog = require('./getDogDetail');

module.exports = postDogs = async (req, res) => {
  try {
    const {
      id,
      name,
      image,
      heightMin,
      heightMax,
      weightMax,
      weightMin,
      lifeSpan,
      bredFor,
      temperament,
      breedGroup,
    } = req.body;

    let temperamentRecord = null;

    if (!name || !heightMin || !heightMax || !weightMin || !weightMax) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (temperament) temperamentRecord = await Temperament.findAll({
        where: {
            name: temperament
        }});



    const [dog, create] = await Dog.findOrCreate({ where:{
      name,
      image,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      lifeSpan,
      bredFor,
      breedGroup,
      created: true,}
    });

    if (temperamentRecord) {
      await dog.addTemperament(temperamentRecord.name);
    }

    return res.status(200).json(dog);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
