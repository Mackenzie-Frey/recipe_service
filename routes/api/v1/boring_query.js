var express = require("express");
var router = express.Router();
var Recipe = require('../../../models').Recipe;
var BoringQuery = require('../../../models').BoringQuery;
var BoringQueryRecipe = require('../../../models').BoringQueryRecipe;
var HeartAttackQuery = require('../../../models').HeartAttackQuery;
var HeartAttackQueryRecipe = require('../../../models').HeartAttackQueryRecipe;
var BBQuery = require('../../../models').BBQuery;
var BBQueryRecipe = require('../../../models').BBQueryRecipe;
const fetch = require('node-fetch');

router.get("/", async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  if (!req.query.query) {
    res.status(404).send({error: "Missing recipe search query."})
  } else {
    const searchQuery = req.query.query.toLowerCase();
    // create url for Edamam using the query from the param
    const appId = process.env.EDAMAM_ID
    const appKey = process.env.EDAMAM_KEY
    var url = `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${appKey}&to=30`

    return findOrFetchRecipes(searchQuery, BoringQuery, url, BoringQueryRecipe)
    .then(recipes => {
      res.status(200).send(JSON.stringify(recipes))
    })
    .catch(error => {
      res.status(404).send({error: error})
    })
  }
});

router.get("/heart-attack", async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  if (!req.query.query) {
    res.status(404).send({error: "Missing recipe search query."})
  } else {
    const searchQuery = req.query.query.toLowerCase();
    // create url for Edamam using the query from the param
    const appId = process.env.EDAMAM_ID
    const appKey = process.env.EDAMAM_KEY
    const recipeFilter = '&nutrientsFAT=1200+&nutrientsNA=5000+&nutrientsSUGAR=300+'
    var url = `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${appKey}&calories=2000-999999&to=30` + recipeFilter

    return findOrFetchRecipes(searchQuery, HeartAttackQuery, url, HeartAttackQueryRecipe)
    .then(recipes => {
      res.status(200).send(JSON.stringify(recipes))
    })
    .catch(error => {
      res.status(404).send({error: error})
    })
  }
});

router.get("/bang-for-your-buck", async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  if (!req.query.query) {
    res.status(404).send({error: "Missing recipe search query."})
  } else {
    const searchQuery = req.query.query.toLowerCase();
    // create url for Edamam using the query from the param
    const appId = process.env.EDAMAM_ID
    const appKey = process.env.EDAMAM_KEY
    const recipeFilter = '&calories=2000-999999&time=1-10'
    var url = `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${appKey}&to=30` + recipeFilter

    return findOrFetchRecipes(searchQuery, BBQuery, url, BBQueryRecipe)
    .then(recipes => {
      recipes.sort((a, b) => a.totalTime - b.totalTime);
      res.status(200).send(JSON.stringify(recipes))
    })
    .catch(error => {
      res.status(404).send({error: error})
    })
  }
});

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
          return createQuery(recipeResponse, searchQuery, queryModel, queryRecipeModel);
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
            model: queryModel,
            attributes: [],
            where: {
              id: query.id
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

function createQuery(recipeResponse, searchQuery, queryModel, queryRecipeModel){
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
    return createRecipe(recipe, query, queryRecipeModel);
  }))
};

function createRecipe(recipe, query, queryRecipeModel){
  return new Promise((resolve, reject) => {
    Recipe.findOrCreate({
      where: {name: recipe.recipe.label},
      defaults: {
        name: recipe.recipe.label,
        url: recipe.recipe.url,
        yield: recipe.recipe.yield,
        calories: Math.round((recipe.recipe.calories / recipe.recipe.yield)),
        image: recipe.recipe.image,
        totalTime: recipe.recipe.totalTime
      }
    })
    .then(recipe => {
      query.addRecipe(recipe[0])
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
