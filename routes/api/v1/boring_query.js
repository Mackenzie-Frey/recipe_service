var express = require("express");
var router = express.Router();
var Recipe = require('../../../models').Recipe;
var BoringQuery = require('../../../models').BoringQuery;
var BoringQueryRecipe = require('../../../models').BoringQueryRecipe;
const fetch = require('node-fetch');
require('dotenv').config()
pry = require('pryjs');

router.get("/", async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  const query = req.query.query.toLowerCase()
  if (!query) {
    res.status(404).send()
  } else {
    try {
      // look in the BoringQuery table
      const boringQueryInstance = await BoringQuery.findOne({
        where: {
          query: query
        }
      })
      if (!boringQueryInstance) {
        // fetch the recipe from Edamam using the query from the param
        const appId = process.env.edamam_id
        const appKey = process.env.edamam_key
        url = `https://api.edamam.com/search?q=chicken&app_id=${appId}&app_key=${appKey}&calories=2000-999999`
        const recipeResponse = await fetch(url)
        recipeResponse.body

        // const recipes = parseRecipes(recipeResponse)
        // Save objects to database in all 3 tables,

        res.status(200).send(JSON.stringify(recipes))
      } else {
        // find the matching recipes
        try {
          // look in the joins table
          const boringQueryRecipeInstances = await BoringQueryRecipe.findAll({
            where: {
              BoringQueryId: boringQueryInstance.id
            }
          })
          try {
            // use the array of recipe id's to look at the Recipe table

            // Make sure to check if the recipe is already saved to the database base on the unique name

            // HOW TO YOU DO THIS FOR A PROMISE>ALL ... for the array of recipes
            const recipes = await Recipe.findAll({
              where: {
                id: boringQueryRecipeInstances.id
                // need to iterate through the above line or something
              }
            })

          } catch (error) {
            res.status(500).send({
              error
            })
          }
        } catch (error) {
          res.status(500).send({
            error
          })
        }
      }
    } catch (error) {
      res.status(500).send({
        error
      })
    }
  }
})

function parseRecipes(recipeResponse) {

  return recipeResponse
}

module.exports = router;
