var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Recipe = require('../../models').Recipe;
var BBQuery = require('../../models').BBQuery;
var BBQueryRecipe = require('../../models').BBQueryRecipe;

describe('BBQuery Recipe index API', () => {
  describe('Test GET /api/v1/recipes/bang-for-your-buck?query=chicken path', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should return a 200 status', async () => {
      BBQuery.findAll().then(response => {
        expect(response.length).toBe(0)
      })
      BBQueryRecipe.findAll().then(response => {
        expect(response.length).toBe(0)
      })
      Recipe.findAll().then(response => {
        expect(response.length).toBe(0)
      })
      const response = await request(app).get("/api/v1/recipes/bang-for-your-buck?query=chicken")
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

      const bandForBuckQuery = await BBQuery.findAll()
      expect(bandForBuckQuery.length).toBe(1)

      const bandForBuckQueryRecipe = await BBQueryRecipe.findAll()
      expect(bandForBuckQueryRecipe.length).toBe(30)

      const recipe = await Recipe.findAll()
      expect(recipe.length).not.toBeLessThan(15)
    });

    test('it should return a 404 status and error message if query does not exist', () => {
      return request(app).get("/api/v1/recipes/heart-attack").then(response => {
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Missing recipe search query.')
      })
    });

    //Test repeat query. Same response as original.
    //Test database entries after and that number of entries in database hasn't changed.

    test('it should return a 404 status when unsuccessful', () => {
      return request(app).get("/bad_path").then(response => {
        expect(response.statusCode).toBe(404)
      });
    });
  });
});
