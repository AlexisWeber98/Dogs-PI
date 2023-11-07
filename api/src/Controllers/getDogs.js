require('dotenv').config();
const { Dog, Temperament } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;


const getDogs = async (req, res) => {
  try {
    const response = await axios.get(URL);
    const dogsApi = response.data;
    const dogApiMap = await Promise.all(dogsApi.map(async (dogApi) => {
      const UrlImage = await axios.get(`https://api.thedogapi.com/v1/images/${dogApi.reference_image_id}`);
      const DogImage = UrlImage.data;

      return {
        name: dogApi.name,
        temperaments: dogApi.temperaments ? dogApi.temperaments : [],
        id: dogApi.id,
        image: DogImage.url,
        life_span: dogApi.life_span,
        height: dogApi.height.metric,
        weight: dogApi.weight.metric,
        bredFor: dogApi.bred_for,
        breed_group: dogApi.breed_group,
      };
    }));
    
    const dogsFromApi = dogApiMap

    // --------------------- Funcion para obtener desde Base de Datos -----------------------//

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
