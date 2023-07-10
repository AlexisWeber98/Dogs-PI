const { Dog, Temperament} = require('../db');


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

    let temperamentRecord = [];

    if (!name || !heightMin || !heightMax || !weightMin || !weightMax) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (temperament) temperamentRecord = await Temperament.findOne({
      where: {
        name: temperament
      }
    });
        else{
          console.log("no se encontro temperament" )
        };



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
      created: true,
    },
      defaults: {
        temperament: temperamentRecord? temperamentRecord.id : null
      }
    });

    if (temperamentRecord) {
      await dog.addTemperaments(temperamentRecord.id);
    }
    return res.status(200).json(dog);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
