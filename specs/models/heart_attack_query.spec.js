var specHelper = require('../spec_helper');
var HeartAttackQuery = require('../../models').HeartAttackQuery;

describe('HeartAttackQuery Model test', () => {
  beforeAll(() => {
    specHelper.tearDown()
    specHelper.testSetup()
  });

  test('It should exist', () => {
    return HeartAttackQuery.create({
        query: 'chicken'
      })
      .then(item => {
        expect(item).toBeInstanceOf(HeartAttackQuery)
      })
  })

  test('It has attributes', () => {
    return HeartAttackQuery.create({
        query: 'oranges'
      })
      .then(item => {
        expect(item.query).toBe('oranges')
      })
  })

  test.skip('It cannot be created without a query attribute', () => {
    expect(HeartAttackQuery.create()).rejects.toThrow()
  })

  test.skip('It cannot be created with a duplicate query attribute', () => {
    expect(HeartAttackQuery.create({
      query: 'oranges'
    })).rejects.toThrow()
  });

  test.skip('It cannot be created with a case insensitive duplicate query attribute', () => {
    expect(HeartAttackQuery.create({
      name: 'OranGes'
    })).rejects.toThrow()
  });
});
