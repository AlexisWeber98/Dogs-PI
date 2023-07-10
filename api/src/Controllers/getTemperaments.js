const {API_KEY} = process.env;
const axios = require('axios')
const {Temperament} = require('../db')

const Url= 'https://api.thedogapi.com/v1/breeds'

   



module.exports = getTemperaments = async (req, res) => {
    try {
        let temperaments = await Temperament.findAll();

        if (temperaments.length === 0) {
            const response = await axios.get(Url);
            const allTemperaments = new Set();

            if (!response.data) {
                throw new Error("Can't get dog information");
            } else {
                response.data.forEach((dog) => {
                    if (dog.temperament) {
                        const temps = dog.temperament.split(", ");
                        temps.forEach((temp) => {
                            allTemperaments.add(temp);
                        });
                    }
                });
            }

            const temperamentsArray = Array.from(allTemperaments);
            await Temperament.bulkCreate(
                temperamentsArray.map((tempName) => ({ name: tempName }))
            );

            temperaments = temperamentsArray;
        } else {
           
        }

        return res.status(200).json(temperaments);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
