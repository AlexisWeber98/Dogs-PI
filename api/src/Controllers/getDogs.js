require('dotenv').config();
const { Dog, Temperament } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getDogs = async (req, res) => {
  try {
    const response = await axios.get(URL);
    const dogsFromApi = response.data;

    const dogsFromDB = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: { attributes: [] }
      }
    });

    const dogs = dogsFromDB.map((dog) => {
      const height = `${dog.heightMin} - ${dog.heightMax} cm`;
      const weight = `${dog.weightMin} - ${dog.weightMax} kg`;

      const temperaments = dog.temperaments?.map((temperament) => temperament.name).join(", ") || '';

      return {
        id: dog.id,
        name: dog.name,
        image: dog.image,
        lifeSpan: dog.lifeSpan,
        height: height,
        weight: weight,
        bredFor: dog.bredFor,
        breedGroup: dog.breedGroup,
        temperament: temperaments,
        created: dog.created
      };
    });

    const allDogs = [...dogsFromApi, ...dogs];

    return res.status(200).json(allDogs);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};




module.exports = {
  getDogs,
};
