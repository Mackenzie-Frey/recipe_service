var specHelper = require('../spec_helper');
var BBQuery = require('../../models').BBQuery;

describe('BBQuery Model test', () => {
  beforeAll(() => {
    specHelper.tearDown()
    specHelper.testSetup()
  });

  test('It should exist', () => {
    return BBQuery.create({
        query: 'chicken'
      })
      .then(item => {
        expect(item).toBeInstanceOf(BBQuery)
      })
  })

  test('It has attributes', () => {
    return BBQuery.create({
        query: 'oranges'
      })
      .then(item => {
        expect(item.query).toBe('oranges')
      })
  })

  test.skip('It cannot be created without a query attribute', () => {
    expect(BBQuery.create()).rejects.toThrow()
  })

  test.skip('It cannot be created with a duplicate query attribute', () => {
    expect(BBQuery.create({
      query: 'oranges'
    })).rejects.toThrow()
  });

  test.skip('It cannot be created with a case insensitive duplicate query attribute', () => {
    expect(BBQuery.create({
      name: 'OranGes'
    })).rejects.toThrow()
  });
});
