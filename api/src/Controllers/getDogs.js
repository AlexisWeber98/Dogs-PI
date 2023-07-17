require('dotenv').config();
const { Dog } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getDogs = async (req, res) => {
  try {
    const response = await axios.get(URL);
    const dogsFromApi = response.data;

    const arrayFromDB = await Dog.findAll();
    
    const dogsFromDB = arrayFromDB.map((dog) => {
      return {
        id: dog.id,
        image: dog.image,
        name: dog.name,
        heightMin: dog.heightMin,
        heightMax: dog.heightMax,
        weightMin: dog.weightMin,
        weightMax: dog.weightMax,
        lifeSpan: dog.lifeSpan,
        bredFor: dog.bredFor,
        breedGroup: dog.breedGroup,
        temperament: dog.temperament,
        created: true,
      };
    });

    const dogs = [...dogsFromApi, ...dogsFromDB];

    console.log(dogs);

    return res.status(200).json(dogs);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getDogs,
};
