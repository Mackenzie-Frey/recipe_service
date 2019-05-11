'use strict';
module.exports = (sequelize, DataTypes) => {
  const HeartAttackQueryRecipe = sequelize.define('HeartAttackQueryRecipe', {
    HeartAttackQueryId: DataTypes.INTEGER,
    RecipeId: DataTypes.INTEGER
  }, {});
  HeartAttackQueryRecipe.associate = function(models) {
    HeartAttackQueryRecipe.belongsTo(models.HeartAttackQuery)
    HeartAttackQueryRecipe.belongsTo(models.Recipe)
  };
  return HeartAttackQueryRecipe;
};
