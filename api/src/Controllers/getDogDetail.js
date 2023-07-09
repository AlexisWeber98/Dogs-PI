require('dotenv').config();
const axios = require("axios");
const {API_KEY} = process.env
const {Dog, Temperaments} = require('../db');


const isIntegerId = (id) => {
    return      /^\d+$/.test(id)
};


const getDetailApi = async (idRaza) => {
    try {
    const URL = `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`
    const {data} = await axios.get(URL)
    
    const dog = data.find((dog) => dog.id === parseInt(idRaza))

    console.log(dog);

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
    const dog = await Dog.findOne({
        where: {id},
        include: {
          model : Temperaments,
        atributes: ["name"],
      through: {atributes: []}}})

        if (!dog) {
            throw new Error('Perro no encontrado en la base de datos')
        };

        const dogDetail = {
            id : dog.id,
            name: dog.name,
            image: dog.image,
            lifeSpan: dog.lifeSpan,
            height: `${dog.heightMin}-${dog.heightMax}`,
            weight: `${dog.weightMin}-${dog.weightMax}`,
            bredFor: dog. bredFor,
            breedGroup: dog.breedGroup,
            temperament: dog.Temperaments,
            create: dog.create
        };

        return dogDetail;
  } catch (error) {
    throw new Error('Error al obtener el detalle del perro desde la Base de Datos');
  }
}

module.exports = getDog =  async (req, res) => {
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

   
