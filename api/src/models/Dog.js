const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://www.kuwaittimes.com/wp-content/uploads/2023/04/1441.jpg"
    },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    heightMin: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    heightMax: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    weightMin: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    weightMax: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    lifeSpan: {
      type: DataTypes.STRING
    },
    bredFor: {
      type: DataTypes.STRING,
      defaultValue: "Unknown",
      allowNull: true
    },
    breedGroup: {
      type: DataTypes.ENUM('Domestic', 'Working', 'Mixed', 'Toy', 'Hound', 'Terrier', 'Non-Sporting', 'Companionship', 'Sporting', 'Herding', 'Undefined'),
      allowNull: false
    },
    temperament: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    vacunated:{
      type: DataTypes.BOOLEAN,
      allowNull:true
    }
  }, {
    timestamps: false
  });
};

