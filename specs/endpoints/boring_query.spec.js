var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Recipe = require('../../models').Recipe;
var BoringQuery = require('../../models').BoringQuery;
var BoringQueryRecipe = require('../../models').BoringQueryRecipe;

describe('BoringQuery Recipe index API', () => {
  describe('Test GET /api/v1/recipes?query=chicken path', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should return a 200 status', () => {
      BoringQuery.findAll().then(response => {
        expect(response.length).toBe(0)
      })
      BoringQueryRecipe.findAll().then(response => {
        expect(response.length).toBe(0)
      })
      Recipe.findAll().then(response => {
        expect(response.length).toBe(0)
      })
      return request(app).get("/api/v1/recipes?query=chicken").then(response => {
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
        BoringQuery.findAll().then(response => {
          expect(response.length).toBe(1)
        })
        BoringQueryRecipe.findAll().then(response => {
          expect(response.length).toBe(30)
        })
        return Recipe.findAll().then(response => {
          expect(response.length).not.toBeLessThan(15)
        })
      });
    });

    test('it should return a 404 status and error message if query does not exist', () => {
      return request(app).get("/api/v1/recipes").then(response => {
        expect(response.status).toBe(404)
        expect(response.body).toBe({
          error: "Missing recipe search query."
        })
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
