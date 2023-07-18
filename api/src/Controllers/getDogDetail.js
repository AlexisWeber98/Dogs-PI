require('dotenv').config();
const axios = require("axios");
const {API_KEY} = process.env
const {Dog, Temperament} = require('../db');


const isIntegerId = (id) => {
    return      /^\d+$/.test(id)
};


const getDetailApi = async (idRaza) => {
    try {
    const URL = `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`
    const {data} = await axios.get(URL)
    
    const dog = data.find((dog) => dog.id === parseInt(idRaza))

  
    const dogDetail = {
        id: dog.id,
        name: dog.name,
        image: dog.image?.url,
        bredFor: dog.bred_for || "unknown",
        breedGroup: dog.breed_group,
        lifeSpan: dog.life_span,
        temperament: dog.temperament,
        origin: dog.origin,
        weight: dog.weight.metric,
        height: dog.height.metric
    };

    return dogDetail;
  } catch (error) {
    throw new Error('Error al obtener el detalle del perro desde la API');
  }
};


const getDetailDB = async (id) => {
  try {
    let findTemperament = null;

    const dog = await Dog.findOne({
      where: { id },
      include: {
        model: Temperament,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    if (!dog) {
      throw new Error('Perro no encontrado en la base de datos');
    }
    
    if (dog.temperaments) {
      findTemperament = dog.temperaments.map((temperament) => temperament.name);
    }

    const dogDetail = {
      id: dog.id,
      name: dog.name,
      image: dog.image,
      lifeSpan: dog.lifeSpan,
      height: `${dog.heightMin}-${dog.heightMax}`,
      weight: `${dog.weightMin}-${dog.weightMax}`,
      bredFor: dog.bredFor,
      breedGroup: dog.breedGroup,
      temperament: findTemperament.join(", "),
      created: dog.created,
    };

    return dogDetail;
  } catch (error) {
    throw new Error('Error al obtener el detalle del perro desde la Base de Datos');
  }
};


module.exports = getDog =  async (req, res) => {
    try {     
      const {idRaza} = req.params     
    
      if (isIntegerId(idRaza)) dogDetail = await getDetailApi(idRaza)
        else {
          dogDetail= await getDetailDB(idRaza)
        };

        console.log(dogDetail);
      return res.status(200).json(dogDetail)

    } catch (error) {
    
    return res.status(500).send(error.message)
  }
};

   
