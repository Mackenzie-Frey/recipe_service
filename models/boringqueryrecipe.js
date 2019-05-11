'use strict';
module.exports = (sequelize, DataTypes) => {
  const BoringQueryRecipe = sequelize.define('BoringQueryRecipe', {
    BoringQueryId: DataTypes.INTEGER,
    RecipeId: DataTypes.INTEGER
  }, {});
  BoringQueryRecipe.associate = function(models) {
    BoringQueryRecipe.belongsTo(models.BoringQuery)
    BoringQueryRecipe.belongsTo(models.Recipe)
  };
  return BoringQueryRecipe;
};
