'use strict';
module.exports = (sequelize, DataTypes) => {
  const BBQueryRecipe = sequelize.define('BBQueryRecipe', {
    BBQueryId: DataTypes.INTEGER,
    RecipeId: DataTypes.INTEGER
  }, {});
  BBQueryRecipe.associate = function(models) {
    BBQueryRecipe.belongsTo(models.BBQuery)
    BBQueryRecipe.belongsTo(models.Recipe)
  };
  return BBQueryRecipe;
};
