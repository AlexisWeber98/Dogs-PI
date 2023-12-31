const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getDogs} = require('../Controllers/getDogs')
const getDog = require('../Controllers/getDogDetail')
const searchDogsByName = require("../Controllers/getDogName")
const getTemperaments = require('../Controllers/getTemperaments')
const postDogs = require('../Controllers/postDogs')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// GET
router.get('/dogs', getDogs);
router.get('/dogs/name', searchDogsByName);
router.get('/dogs/:idRaza', getDog)
router.get('/temperaments', getTemperaments)

//POST
router.post('/dogs', postDogs)


module.exports = router;
