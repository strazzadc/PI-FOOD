const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    spoonacularScore: {
      type: DataTypes.FLOAT(1),
      allowNull: false,
      validate:{
        min: 0,
        max: 100
      }
    },
    healthScore: {
      type: DataTypes.FLOAT(1),
      allowNull: false,
      validate:{
        min: 0,
        max: 100
      }
    },
    instructions: {
      type: DataTypes.TEXT  
    },
    image:{
      type: DataTypes.STRING
    },
    dishTypes:{
      type: DataTypes.STRING
    }
  });
};
