const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type :DataTypes.UUID,
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    
    heightMin:{
      type: DataTypes.FLOAT,
      allowNull:false
    },

    heightMax: {
      type: DataTypes.FLOAT,
      allowNull:false
    },

    weightMin:{
      type: DataTypes.FLOAT,
      allowNull:false
    },

    weightMax:{
      type: DataTypes.FLOAT,
      allowNull:false
    },

    lifeSpan: {
      type: DataTypes.STRING,

    },

    bredFor: {
      type: DataTypes.STRING,
      defaultValue: "Unknow",
      allowNull: true
    },

    breedGroup:{
      type:DataTypes.ENUM('Domestic', "Working", "Mixed", "Toy", "Hound", "Terrier", "Non-Sporting", "Companionship", "Sporting", "Herding", "Undefined"),
      allowNull: false,
    },

    temperament: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'temperaments',
        key: 'id' 
      }
    },
    
    created: {
      type: DataTypes.BOOLEAN,
    defaultValue:false  
    },
 
  }, { timestamps: false});
};
