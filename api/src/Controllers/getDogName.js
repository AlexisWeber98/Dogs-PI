const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const URL = "https://api.thedogapi.com/v1/breeds/search?q=";

// ---------------- Funcion para buscar en la API ----------------------//

const getFromApi = async (name) => {
	try {
	
		const response = await axios.get( `${URL}${name}` )
		
		const dog = response.data;
		
		return dog
	} catch (error) {
		
	}
};

//---------------- Funcion para buscar en la DataBase ---------------------//

const getFromDataBase = async (name) => {
	const dogDb = await Dog.findAll({where:{
		name: {
			[Op.iLike]: `%${name}%`}
	}, include: Temperament});
	
	
	return dogDb;
}

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
	
