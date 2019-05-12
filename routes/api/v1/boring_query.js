var express = require("express");
var router = express.Router();
var Recipe = require('../../../models').Recipe;
var BoringQuery = require('../../../models').BoringQuery;
var BoringQueryRecipe = require('../../../models').BoringQueryRecipe;
const fetch = require('node-fetch');
pry = require('pryjs');

router.get("/", async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  if (!req.query.query) {
    res.status(404).send({error: "Missing recipe search query."})
  } else {
    const searchQuery = req.query.query.toLowerCase()
      // look in the BoringQuery table
    BoringQuery.findOne({
      where: {
        query: searchQuery
      }
    })
    .then(query => {
      if (!query) {
        // fetch the recipes from Edamam using the query from the param
        const appId = process.env.EDAMAM_ID
        const appKey = process.env.EDAMAM_KEY
        url = `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${appKey}&calories=2000-999999`

        getRecipes(url)
        .then(recipeResponse => {
          saveBoringRecipes(recipeResponse, searchQuery)
          .then(query => {
            Recipe.findAll({
              include: [{
                model: BoringQueryRecipe,
                where: {
                  BoringQueryId: query.id
                }
              }]
              //order: [['calories', 'DESC']],
              //limit: 10
            })

            .then(tests => {
              res.status(200).send(JSON.stringify(tests))
            })
            .catch(error => {
              res.status(404).send({error: "test"})
            })
          })
          .catch(error => {
            res.status(404).send({error: "other error"})
          })
        })
        .catch(error => {
          res.status(404).send({error: "Didnt save recipes"})
        })
      } else {
        // find the matching recipes
        try {
          // look in the joins table
          // BoringQueryRecipe.findAll({
          //   where: {
          //     BoringQueryId: query.id
          //   }
          // })
          // .then()
          // try {
          //   // use the array of recipe id's to look at the Recipe table
          //
          //   // Make sure to check if the recipe is already saved to the database base on the unique name
          //
          //   // HOW TO YOU DO THIS FOR A PROMISE>ALL ... for the array of recipes
          //   const recipes = await Recipe.findAll({
          //     where: {
          //       id: boringQueryRecipeInstances.id
          //       // need to iterate through the above line or something
          //     }
          //   })

        } catch (error) {
          res.status(500).send({
            error: "test error"
          })
        }
      }
    })
    .catch(error => {
      res.status(404).send({error: "Bad Edamam request. Missing credentials."})
    })
  }
})

function getRecipes(url){
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(response => {
      if (response.status = 200){
        resolve(response.json())
      }else{
        reject(result.error_message)
      }
    })
  })
};

function saveBoringRecipes(recipeResponse, searchQuery){
  return new Promise((resolve, reject) => {
    BoringQuery.create({
      query: searchQuery
    })
    .then(query => {

      recipeResponse.hits.forEach(recipe => {
        Recipe.create({
          name: recipe.recipe.label,
          url: recipe.recipe.url,
          yield: recipe.recipe.yield,
          calories: Math.round((recipe.recipe.calories / recipe.recipe.yield)),
          image: recipe.recipe.image,
          totalTime: recipe.recipe.totalTime
        })
        .then(newRecipe => {
          BoringQueryRecipe.create({
            BoringQueryId: query.id,
            RecipeId: newRecipe.id
          })
          .then(() => {
            return
          })
        })
        .catch((error) => {
          return
        })
      })
      resolve(query)
    })
    .catch(error => {
      reject(error)
    })
  })
};

function parseRecipes(recipeResponse) {

  return recipeResponse
}

module.exports = router;
