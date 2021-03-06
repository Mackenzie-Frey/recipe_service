'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    image: DataTypes.STRING,
    yield: DataTypes.DECIMAL,
    calories: DataTypes.INTEGER,
    totalTime: DataTypes.DECIMAL
  }, {});
  Recipe.associate = function(models) {
    Recipe.hasMany(models.BoringQueryRecipe)
    Recipe.belongsToMany(models.BoringQuery, {
      through: models.BoringQueryRecipe,
      foreignKey: 'RecipeId'
    })
    Recipe.hasMany(models.HeartAttackQueryRecipe)
    Recipe.belongsToMany(models.HeartAttackQuery, {
      through: models.HeartAttackQueryRecipe,
      foreignKey: 'RecipeId'
    })
    Recipe.hasMany(models.BBQueryRecipe)
    Recipe.belongsToMany(models.BBQuery, {
      through: models.BBQueryRecipe,
      foreignKey: 'RecipeId'
    })
  };
  return Recipe;
};
