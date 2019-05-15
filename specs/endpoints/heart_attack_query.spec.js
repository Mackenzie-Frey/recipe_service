var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Recipe = require('../../models').Recipe;
var HeartAttackQuery = require('../../models').HeartAttackQuery;
var HeartAttackQueryRecipe = require('../../models').HeartAttackQueryRecipe;

describe('HeartAttackQuery Recipe index API', () => {
  describe('Test GET /api/v1/recipes/heart-attack?query=chicken path', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should return a 200 status', async () => {
      HeartAttackQuery.findAll().then(response => {
        expect(response.length).toBe(0)
      })
      HeartAttackQueryRecipe.findAll().then(response => {
        expect(response.length).toBe(0)
      })
      Recipe.findAll().then(response => {
        expect(response.length).toBe(0)
      })
      const response = await request(app).get("/api/v1/recipes/heart-attack?query=chicken")
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toEqual(10)
        expect(Object.keys(response.body[0])).toContain('id')
        expect(Object.keys(response.body[0])).toContain('url')
        expect(Object.keys(response.body[0])).toContain('yield')
        expect(Object.keys(response.body[0])).toContain('calories')
        expect(Object.keys(response.body[0])).toContain('image')
        expect(Object.keys(response.body[0])).toContain('totalTime')
        expect(Object.keys(response.body[0])).toContain('name')

        const heartAttackQuery = await HeartAttackQuery.findAll()
        expect(heartAttackQuery.length).toBe(1)

        const heartAttackQueryRecipe = await HeartAttackQueryRecipe.findAll()
        expect(heartAttackQueryRecipe.length).toBe(30)

        const recipe = await Recipe.findAll()
        expect(recipe.length).not.toBeLessThan(15)
    });

    test.skip('it should return a 404 status and error message if query does not exist', () => {
      return request(app).get("/api/v1/recipes/heart-attack").then(response => {
        expect(response.status).toBe(404)
        expect(response.body).toBe({
          error: "Missing recipe search query."
        })
      })
    });

    //Test for query, recipes and queryRecipe additions to database (1, 30, 30 respectively)
    //Test repeat query. Same response as original.
    //Test database entries after and that number of entries in database hasn't changed.

    test.skip('it should return a 404 status when unsuccessful', () => {
      return request(app).get("/bad_path").then(response => {
        expect(response.statusCode).toBe(404)
      });
    });
  });
});
