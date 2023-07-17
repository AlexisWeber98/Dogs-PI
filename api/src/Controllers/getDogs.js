require('dotenv').config();
const { Dog, Temperament } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getDogs = async (req, res) => {
  try {
    const response = await axios.get(URL);
    const dogsFromApi = response.data;

    const arrayFromDB = await Dog.findAll({include: {
      model: Temperament,
      atributes: ["name"],
      through: {atributes:[]}

    }});
    

    console.log(arrayFromDB);
    
    const dogsFromDB = arrayFromDB.map(async (dog) => {
      let findTemperament = null;

      if (dog.temperament) {
        findTemperament = await Temperament.findOne({
          where: {
            id: dog.temperament,
          },
        });
      }

      const height = `${dog.heightMin} - ${dog.heightMax} cm`;
      const weight = `${dog.weightMin} - ${dog.weightMax} kg`;

      return {
        id : dog.id,
        name: dog.name,
        image: dog.image,
        lifeSpan: dog.lifeSpan,
        height: height,
        weight: weight,
        bredFor: dog.bredFor,
        breedGroup: dog.breedGroup,
        temperament: findTemperament?.name,
        created: dog.created
      };
    });

    const resolvedDogsFromDB = await Promise.all(dogsFromDB)

    const dogs = [...dogsFromApi, ...resolvedDogsFromDB];

   

    return res.status(200).json(dogs);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getDogs,
};
