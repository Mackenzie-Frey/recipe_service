'use strict';
module.exports = (sequelize, DataTypes) => {
  const BBQuery = sequelize.define('BBQuery', {
    query: DataTypes.STRING
  }, {});
  BBQuery.associate = function(models) {
    BBQuery.hasMany(models.BBQueryRecipe)
    BBQuery.belongsToMany(models.Recipe, {
      through: models.BBQueryRecipe,
      foreignKey: 'BBQueryId'
    })
  };
  return BBQuery;
};
