'use strict';
module.exports = (sequelize, DataTypes) => {
  const BoringQueryRecipe = sequelize.define('BoringQueryRecipe', {
    BoringQueryId: DataTypes.INTEGER,
    RecipeId: DataTypes.INTEGER
  }, {});
  BoringQueryRecipe.associate = function(models) {
    BoringQueryRecipe.belongTo(models.BoringQuery)
    BoringQueryRecipe.belongTo(models.Recipe)
  };
  return BoringQueryRecipe;
};
