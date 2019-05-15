var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var queryFile = require('../../routes/api/v1/query.js')

describe('Methods for all query endpoints', () => {
  // object being returned is {}, expected behavior is {test: 'thing'}
  //  in order to call queryFile.getRecipes, make sure to insert:
  // module.exports.getRecipes = getRecipes;
  // into the bottom of the routes/api/v1/query.js file.
  test.skip('getRecipes', () => {

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({test: 'thing'})
    })
    )
console.log(global.fetch)
    expect(queryFile.getRecipes('www.test.com')).toBe({test: 'thing'})
  })
})
