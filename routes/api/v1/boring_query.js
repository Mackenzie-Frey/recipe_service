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
    // look in the BoringQuery table for an existing query matching the request
    BoringQuery.findOne({
      where: {
        query: searchQuery
      }
    })
    .then(query => {
      //if it is a new query
      if (!query) {
        // create url for Edamam using the query from the param
        const appId = process.env.EDAMAM_ID
        const appKey = process.env.EDAMAM_KEY
        url = `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${appKey}&calories=2000-999999`

        //fetch new recipes from edamam api
        getRecipes(url)
        .then(recipeResponse => {
          //create BoringQuery, Recipes, and BoringQueryRecipes in database
          return saveBoringRecipes(recipeResponse, searchQuery);
        })
        .then(recipes => {
          //Send newly retrieved recipes. Sort by highest calorie total and only top 10 results.
          //This code is being saved for use in a later compenent.
          // return Recipe.findAll({
          //   include: [{
          //     model: BoringQueryRecipe,
          //     where: {
          //       BoringQueryId: query.id
          //     }
          //   }]
          //   //order: [['calories', 'DESC']],
          //   //limit: 10
          // })
          recipes.sort((a, b) => b.calories - a.calories);
          recipes.slice(0, 9);
          res.status(200).send(JSON.stringify(recipes))
        })
        .catch(error => {
          res.status(404).send({error: error})
        })
      //If an existing query is found
      } else {
        // find the recipes that are already associated with the existing query
        try {
          // look in the recipes table with includes, where, order, and limit
        } catch (error) {
          res.status(404).send({error: error})
        }
      }
    })
    .catch(error => {
      res.status(404).send({error: "Bad search query."})
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
      resolve(parseRecipes(recipeResponse, query));
    })
    .catch(error => {
      reject(error)
    })
  })
};

function parseRecipes(recipeResponse, query) {
  return Promise.all(recipeResponse.hits.map(recipe => {
    return saveRecipe(recipe, query);
  }))
};

function saveRecipe(recipe, query){
  return new Promise((resolve, reject) => {
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
        resolve(newRecipe)
      })
    })
    .catch((error) => {
      reject(error)
    })
  })
};

module.exports = router;
