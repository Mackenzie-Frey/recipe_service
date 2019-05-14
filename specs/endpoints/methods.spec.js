var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var queryFile = require('../../routes/api/v1/query.js');
const fetch = require('node-fetch');
jest.mock('node-fetch', () => jest.fn());
// import * as methods from '../../routes/api/v1/query'

describe('Methods for all query endpoints', () => {
  test('getRecipes', () => {

    fetch.mockImplementation(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({test: 'thing'})
    })
    )

    expect(queryFile.getRecipes('www.test.com')).toBe(0)
  })
})
