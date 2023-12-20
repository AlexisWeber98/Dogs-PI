const { Dog, Temperament } = require("../db");

module.exports = postDogs = async (req, res) => {
  try {
    const {
      name,
      image,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      lifeSpan,
      bredFor,
      temperament,
      breedGroup,
      vacunated,
    } = req.body;

    console.log(req.body);

    let imagen = image;
    if (!imagen)
      imagen =
        "https://www.kuwaittimes.com/wp-content/uploads/2023/04/1441.jpg";
    if (!name || !heightMin || !heightMax || !weightMin || !weightMax) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let temperamentRecords = [];

    if (temperament && Array.isArray(temperament)) {
      temperamentRecords = await Temperament.findAll({
        where: {
          name: temperament,
        },
      });
    }

    const dog = await Dog.create({
      name,
      image: imagen,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      lifeSpan,
      bredFor,
      breedGroup,
      vacunated,
      created: true,
    });

    console.log("el log del create:", dog);

    for (let i = 0; i < temperamentRecords.length; i++) {
      await dog.addTemperament(temperamentRecords[i]);
    }

    return res.status(200).json(dog);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
