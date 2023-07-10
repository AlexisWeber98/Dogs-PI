const { default: axios } = require('axios');
const { Dog } = require('../db')
const {URL} = process.env
const search = "search?q="


const getDogNameApi = async (req,res)=>{
try {
    const {name} = req.query;

    const response = await axios(`${URL}/${search}${name}`)
    const dog = response.data;

    if(!dog) return res.status(404).json({message: "no se encontraron resultados en la API"});

    return res.status(200).json(dog)

} catch (error) {
    res.status(500).json({ message: 'Error al buscar razas de perros por nombre en la API externa'}); 
}
};


const getDogDataBase = async (req, res) => {
    const {name} = req.query;
    
};

module.exports = getDogName = async (req, res) => {
    try {

    
    } catch (error) {

    };

};
    