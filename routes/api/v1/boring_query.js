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
    const searchQuery = req.query.query.toLowerCase();
    // create url for Edamam using the query from the param
    const appId = process.env.EDAMAM_ID
    const appKey = process.env.EDAMAM_KEY
    url = `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${appKey}&calories=2000-999999&to=30`

    return findOrFetchRecipes(searchQuery, BoringQuery, url, BoringQueryRecipe)
    .then(recipes => {
      res.status(200).send(JSON.stringify(recipes))
    })
    .catch(error => {
      res.status(404).send({error: error})
    })
  }
})

function findOrFetchRecipes(searchQuery, queryModel, url, queryRecipeModel){
  return new Promise((resolve, reject) => {
    // look in the BoringQuery table for an existing query matching the request
    queryModel.findOne({
      where: {
        query: searchQuery
      }
    })
    .then(query => {
      //if it is a new query
      if (!query) {
        //fetch new recipes from edamam api
        getRecipes(url)
        .then(recipeResponse => {
          //create BoringQuery, Recipes, and BoringQueryRecipes in database
          return saveBoringRecipes(recipeResponse, searchQuery, queryModel, queryRecipeModel);
        })
        .then(recipes => {
          //Send newly retrieved recipes. Sort by highest calorie total and only top 10 results.
          recipes.sort((a, b) => b.calories - a.calories);
          recipes = recipes.slice(0, 10);
          //res.status(200).send(JSON.stringify(recipes))
          resolve(recipes)
        })
        .catch(error => {
          reject(error)
        })
      //If an existing query is found
      } else {
        // find the recipes that are already associated with the existing query
        Recipe.findAll({
          include: [{
            model: queryRecipeModel,
            attributes: [],
            where: {
              BoringQueryId: query.id
            }
          }],
          order: [['calories', 'DESC']],
          limit: 10
        })
        .then(recipes => {
          //Send retrieved recipes.
          resolve(recipes)
        })
        .catch(error => {
          reject(error)
        })
      }
    })
    .catch(error => {
      error = "Bad search query."
      reject(error)
    })
  })
};


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

function saveBoringRecipes(recipeResponse, searchQuery, queryModel, queryRecipeModel){
  return new Promise((resolve, reject) => {
    queryModel.create({
      query: searchQuery
    })
    .then(query => {
      resolve(parseRecipes(recipeResponse, query, queryRecipeModel));
    })
    .catch(error => {
      reject(error)
    })
  })
};

function parseRecipes(recipeResponse, query, queryRecipeModel) {
  return Promise.all(recipeResponse.hits.map(recipe => {
    return saveRecipe(recipe, query, queryRecipeModel);
  }))
};

function saveRecipe(recipe, query, queryRecipeModel){
  return new Promise((resolve, reject) => {
    Recipe.findOrCreate({
      where: {name: recipe.recipe.label},
      defaults: {
        url: recipe.recipe.url,
        yield: recipe.recipe.yield,
        calories: Math.round((recipe.recipe.calories / recipe.recipe.yield)),
        image: recipe.recipe.image,
        totalTime: recipe.recipe.totalTime
      }
    })
    .then(recipe => {
      queryRecipeModel.create({
        BoringQueryId: query.id,
        RecipeId: recipe[0].id
      })
      .then(() => {
        resolve(recipe[0])
      })
    })
    .catch((error) => {
      reject(error)
    })
  })
};

module.exports = router;
