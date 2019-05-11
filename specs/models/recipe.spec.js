var specHelper = require('../spec_helper');
var Recipe = require('../../models').Recipe;

describe('Recipe Model test', () => {
  beforeAll(() => {
    specHelper.tearDown()
    specHelper.testSetup()
  });

  test('It should exist', () => {
    return Recipe.create({
        name: 'test recipe 1',
        url: 'www.test.com',
        yield: 4.0,
        calories: 1000,
        totalTime: 300.5
      })
      .then(recipe => {
        expect(recipe).toBeInstanceOf(Recipe)
      })
  })

  test('It has attributes', () => {
    return Recipe.create({
        name: 'test recipe 2',
        url: 'www.test.com',
        yield: 4.0,
        calories: 1000,
        totalTime: 300.5
      })
      .then(recipe => {
        expect(recipe.name).toBe('test recipe 2')
        expect(recipe.url).toBe('www.test.com')
        expect(recipe.yield).toBe("4")
        expect(recipe.calories).toBe(1000)
        expect(recipe.totalTime).toBe("300.5")
      })
  })

  test.skip('It cannot be created without a name', () => {
    expect(Recipe.create()).rejects.toThrow()
  })

  test.skip('It cannot be created with a duplicate name', () => {
    expect(Recipe.create({
      name: 'test recipe 1'
    })).rejects.toThrow()
  });

  test.skip('It cannot be created with a case insensitive duplicate name', () => {
    expect(Recipe.create({
      name: 'TeSt rEcipe 1'
    })).rejects.toThrow()
  });
});
