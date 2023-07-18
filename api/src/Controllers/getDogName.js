const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const URL = "https://api.thedogapi.com/v1/breeds/";

// ---------------- Funcion para buscar en la API ----------------------//

const getFromApi = async (name) => {
	try {
	
		const response = await axios.get(URL)
		
		const dog = response.data.filter((dog)=>dog.name.toLowerCase().includes(name.toLowerCase()))
		
		return dog
	} catch (error) {
		
	}
};

//---------------- Funcion para buscar en la DataBase ---------------------//

const getFromDataBase = async (name) => {
	const dogsDb = await Dog.findAll({
	  where: {
		name: {
		  [Op.iLike]: `%${name}%`
		}
	  },
	  include: {
		model: Temperament,
		attributes: ['name'], // Incluir solo el atributo "name"
		through: { attributes: [] }
	  }
	});
  
	const dogs = dogsDb.map((dog) => {
	  const temperamentsMaps = dog.temperaments.map((temperament) => temperament.name);
	  const temperaments = temperamentsMaps.join(" ")
	  return {
		id: dog.id,
		name: dog.name,
		image: dog.image,
		heightMin: dog.heightMin,
		heightMax: dog.heightMax,
		weightMin: dog.weightMin,
		weightMax: dog.weightMax,
		lifeSpan: dog.lifeSpan,
		bredFor: dog.bredFor,
		breedGroup: dog.breedGroup,
		temperament: temperaments // Usar los nombres de los temperamentos en lugar de los objetos completos
	  };
	});
  
	return dogs;
  };
  
//------------------Funcion General--------------- //


module.exports = searchDogsByName = async (req, res) => {
	try {
		const { name } = req.query

		const dogsFromApi = await getFromApi(name);
		const dogsFromDataBase = await getFromDataBase(name)

		const dogs = [...dogsFromApi, ...dogsFromDataBase];

		
		if (!dogs || dogs.length === 0) return res.status(404).json({message: "dogs not found" });
		
		return res.status(200).json(dogs)

	} catch (error) {
		return res.status(500).json({ error: 'Error al buscar los perros por nombre' });
	}
};
	
