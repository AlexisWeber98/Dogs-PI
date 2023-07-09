require('dotenv').config();
const axios = require("axios");
const {API_KEY} = process.env


const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`

const getDogs = async (req, res) => {
try {
    const response = await axios.get(URL)
    const data = response.data

    return res.status(200).json(data)
} catch (error) {
    return res.status(500).send(error.message)
}
}


module.exports = {
    getDogs
}