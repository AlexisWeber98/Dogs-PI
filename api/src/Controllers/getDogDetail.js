require('dotenv').config();
const axios = require("axios");
const {API_KEY} = process.env
const {Dog, Temperaments} = require('../db');


const isIntegerId = (id) => {
    return /^\d+$/.test(id)
};


const getDetailApi = async (id) => {
    try {
    const URL = `https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`
    const {data} = await axios.get(URL)

    const dogDetail = {
        id: data.id,
        name: data.name,
        image: data.image?.url,
        bredFor: data.bred_for || "unknown",
        breedGroup: data.breed_group,
        lifeSpan: data.life_span,
        temperament: data.temperament,
        origin: data.origin,
        weight: data.weight.metric,
        height: data.height.metric
    };

    return dogDetail;
  } catch (error) {
    throw new Error('Error al obtener el detalle del perro desde la API');
  }
};


const getDetailDB = async (id) => {
    try {
    const dog = await Dog.findOne({
        where: {id},
        include: [Temperaments]})

        if (!dog) {
            throw new Error('Perro no encontrado en la base de datos')
        };

        const dogDetail = {
            id : dog.id,
            name: dog.name,
            lifeSpan: dog.lifeSpan,
            height: `${dog.heightMin}-${dog.heightMax}`,
            weight: `${dog.weightMin}-${dog.weightMax}`,
            bredFor: dog. bredFor,
            breedGroup: dog.breedGroup,
            temperaments: dog.Temperaments.map((temperament => temperament.name)),
            create: dog.create
        };

        return dogDetail;
  } catch (error) {
    throw new Error('Error al obtener el detalle del perro desde la Base de Datos');
  }
}

module.exports = getDogDetail =  async (req, res) => {
    try { 
        
        const {idRaza} = req.params     
    
        if (isIntegerId(idRaza)) dogDetail = await getDetailApi(idRaza)
          else {
            dogDetail= await getDetailDB(idRaza)
        };

        return res.status(200).json(dogDetail)

    } catch (error) {
        return res.status(500).send(error.message)
    }
    }

   
