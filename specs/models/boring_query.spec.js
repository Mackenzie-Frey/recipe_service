var specHelper = require('../spec_helper');
var BoringQuery = require('../../models').BoringQuery;

describe('BoringQuery Model test', () => {
  beforeAll(() => {
    specHelper.tearDown()
    specHelper.testSetup()
  });

  test('It should exist', () => {
    return BoringQuery.create({
        query: 'chicken'
      })
      .then(item => {
        expect(item).toBeInstanceOf(BoringQuery)
      })
  })

  test('It has attributes', () => {
    return BoringQuery.create({
        query: 'oranges'
      })
      .then(item => {
        expect(item.query).toBe('oranges')
      })
  })

  test.skip('It cannot be created without a query attribute', () => {
    expect(BoringQuery.create()).rejects.toThrow()
  })

  test.skip('It cannot be created with a duplicate query attribute', () => {
    expect(BoringQuery.create({
      query: 'oranges'
    })).rejects.toThrow()
  });

  test.skip('It cannot be created with a case insensitive duplicate query attribute', () => {
    expect(BoringQuery.create({
      name: 'OranGes'
    })).rejects.toThrow()
  });
});
