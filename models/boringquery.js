'use strict';
module.exports = (sequelize, DataTypes) => {
  const BoringQuery = sequelize.define('BoringQuery', {
    query: DataTypes.STRING
  }, {});
  BoringQuery.associate = function(models) {
    BoringQuery.hasMany(models.BoringQueryRecipe)
    BoringQuery.belongsToMany(models.Recipe, {
      through: models.BoringQueryRecipe,
      foreignKey: 'BoringQueryId'
    })
  };
  return BoringQuery;
};
