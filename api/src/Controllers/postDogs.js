const {Dog} = require('../db')


module.exports = postDogs = async (req, res) => {
    try {
        const {id, name, image, heightMin, heightMax, weightMax, weightMin, lifeSpan, bredFor, breedGroup } = req.body;

        if(!name || !heightMin|| !heightMax || !weightMin|| !weightMax) return res.status(400).json({message:"All fields are required"});
        
       const newDog = await Dog.findOrCreate({where: {
            id,
            name,
            image,
            heightMin,
            heightMax,
            weightMin,
            weightMax,
            lifeSpan,
            bredFor,
            breedGroup
        }})

        return res.status(200).json(newDog)

    }
    catch (error){
        res.status(500).send(error.message)
    }
}