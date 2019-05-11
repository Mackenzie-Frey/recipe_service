'use strict';
module.exports = (sequelize, DataTypes) => {
  const HeartAttackQuery = sequelize.define('HeartAttackQuery', {
    query: DataTypes.STRING
  }, {});
  HeartAttackQuery.associate = function(models) {
    HeartAttackQuery.hasMany(models.HeartAttackQueryRecipe)
    HeartAttackQuery.belongsToMany(models.Recipe, {
      through: models.HeartAttackQueryRecipe,
      foreignKey: 'HeartAttackQueryId'
    })
  };
  return HeartAttackQuery;
};
