# README

## Description
Recipe Service is part of a 10-day, paired project during module four of four, of Turing School's Back-End Engineering Program. Recipe Service is a microservice which consumes the Edamam Recipe API and is utilized by [Quantified Self](https://github.com/nagerz/quantified_self). The application utilizes Node.js, Expess, Sequelize, PostgreSQL, and Jest.

#### [**_View Recipe Service in Production_**](https://sq-recipe-service.herokuapp.com/) </br>

### Schema
![Alt text](./public/images/schema.png?raw=true "Database Schema")

## Getting Started

To run Recipe Service on a local machine, navigate to the directory in which you would like the project to be located in, then execute the following commands:

```
$ git clone git@github.com:Mackenzie-Frey/recipe_service.git
$ cd recipe_service
$ npm install # Installs dependencies
$ npx sequelize db:create # Creates PostgreSQL Database
$ npx sequelize db:migrate # Runs migrations for the database setup
$ npx sequelize db:seed:all # Runs seed file for seeding the database
```

If Postgres was locally installed using homebrew, run the command:
```
/usr/local/opt/postgres/bin/createuser -s postgres
```
This will create a new postgres user by the name of postgres. This enables all collaborators to utilize the same username and enables the `config.json` file functionality for the database username.

#### Environment Variable Setup:

 Sign Up for the following API:
* [Edamam Recipe Search](https://developer.edamam.com/)

Create a `.env` file in the root directory of the project. Add `.env` to the `.gitignore` file. Make sure to insert the secret key without the alligator clips ( < > ).
```
EDAMAM_ID=<edamam_id>
EDAMAM_KEY=<edamam_key>
```

## Running Tests
To run the test suite, execute the following command: `npm test`. The tests will automatically run each time an update is made to the application.

## Test Coverage
To run a test coverage report execute the command: `npx jest --coverage`. The report will look like the following.

![Alt text](./public/images/test_coverage.png?raw=true "Test Coverage Report")

Navigate to the project directory of `coverage/lcov-report/recipe_service/`. Copy the file path and execute the command: `open insert_file_path`. This will open the specific coverage report in the default browser.

## Deployment

To view Recipe Service in development, execute the following command from the project directory: `nodemon npm start`. To view the application in a web browser, visit `localhost:3000` and navigate the the desired endpoint.


## Available Endpoints
The application provides the following endpoints:

### Endpoints

#### Recipe Index Endpoint
Recipes can be retrieved via a `GET` request to the `api/v1/recipes?query=food` endpoint, where `food` is substituted for a food item ie `chocolate`.

If the request is successful, the application will retrieve a list of up to 10 recipes containing chocolate, sorted by descending calories.

``` HTTP
status: 200
body:
[
    {
        "id": 216,
        "name": "Orange Crush Cake",
        "url": "http://thepioneerwoman.com/cooking/2014/10/orange-crush-cake/",
        "yield": "12",
        "calories": 720,
        "image": "https://www.edamam.com/web-img/99c/99cc74f1f8e0fe7ac2842e716f7b9d26.jpg",
        "totalTime": "0",
        "updatedAt": "2019-05-16T02:37:16.666Z",
        "createdAt": "2019-05-16T02:37:16.666Z"
    },
    {
        "id": 221,
        "name": "Orange Marmalade",
        "url": "https://www.menshealth.com/recipes/orange-marmalade",
        "yield": "1",
        "calories": 603,
        "image": "https://www.edamam.com/web-img/ee3/ee3f77f4e3f80ac79f297ca4fbc8d47b.jpg",
        "totalTime": "0",
        "updatedAt": "2019-05-16T02:37:16.722Z",
        "createdAt": "2019-05-16T02:37:16.722Z"
    }
]
```

If the request is unsuccessful due to a missing search query, the application will return the response of:
``` HTTP
status: 404
body:
{
  error: "Missing recipe search query."
}
```

#### Heart Attack Recipe Index Endpoint
Recipes with high calories, sodium, fat, and sugar can be retrieved via a `GET` request to the `api/v1/recipes/heart-attack?query=chocolate` endpoint.

If the request is successful, the application will retrieve a list of up to 10 recipes containing chocolate, sorted by descending calories.

``` HTTP
status: 200
body:
[
    {
        "id": 232,
        "name": "Chocolate Caramel Crunch Almonds recipes",
        "url": "https://smittenkitchen.com/2016/12/chocolate-caramel-crunch-almonds-new-kitchen-favorites/",
        "yield": "2",
        "calories": 18494,
        "image": "https://www.edamam.com/web-img/0b4/0b43639f2689758b795be49f82d20808",
        "totalTime": "60",
        "updatedAt": "2019-05-16T02:45:13.020Z",
        "createdAt": "2019-05-16T02:45:13.020Z"
    },
    {
        "id": 240,
        "name": "Chocolate Game Board",
        "url": "https://www.foodnetwork.com/recipes/chocolate-game-board-recipe-3381296",
        "yield": "1",
        "calories": 18452,
        "image": "https://www.edamam.com/web-img/597/597d46f5482cbddd36edf61ebb769571.jpeg",
        "totalTime": "240",
        "updatedAt": "2019-05-16T02:45:13.141Z",
        "createdAt": "2019-05-16T02:45:13.141Z"
    }
]
```

If the request is unsuccessful due to a missing search query, the application will return the response of:
``` HTTP
status: 404
body:
{
  error: "Missing recipe search query."
}
```

#### Bang for your Buck Recipe Index Endpoint
Recipes that are high in calories, but low in total preparation time can be retrieved via a `GET` request to the `/api/v1/recipes/bang-for-your-buck?query=chocolate` endpoint.

If the request is successful, the application will retrieve a list of up to 10 recipes containing chocolate, sorted by descending total prep time and descending calories.

``` HTTP
status: 200
body:
[
    {
        "id": 280,
        "name": "Chocolate Roulade",
        "url": "https://drupal.eatsmarter.com/recipes/chocolate-roulade-0",
        "yield": "1",
        "calories": 3427,
        "image": "https://www.edamam.com/web-img/e0e/e0efd3e4efa92dfe492b17dbfc258c27.jpg",
        "totalTime": "1",
        "updatedAt": "2019-05-16T02:46:56.050Z",
        "createdAt": "2019-05-16T02:46:56.050Z"
    },
    {
        "id": 288,
        "name": "Coconut and Dark Chocolate Chunk Ice Cream recipes",
        "url": "http://www.creative-culinary.com/coconut-and-dark-chocolate-chunk-ice-cream/",
        "yield": "1",
        "calories": 8781,
        "image": "https://www.edamam.com/web-img/3c0/3c0bf254228465e6297aa40e87241c47",
        "totalTime": "5",
        "updatedAt": "2019-05-16T02:46:56.098Z",
        "createdAt": "2019-05-16T02:46:56.098Z"
    }
]
```

If the request is unsuccessful due to a missing search query, the application will return the response of:
``` HTTP
status: 404
body:
{
  error: "Missing recipe search query."
}
```

## Tools
* Edamam API Endpoint
* Postman
* dotenv
* node-fetch
* pryjs
* babel-jest
* nodemon
* scriptjs
* shelljs
* supertest
* beautify
* Circle CI

## How to Contribute

###### Contributing Code:
1. Fork the project.
2. Write a failing test.
3. Commit that failing tests.
4. Commit changes that fix the tests.
4. Submit a pull request detailing the change that was made.

###### Submitting a Bug:
1. Search the existing [issues](https://github.com/nagerz/quantified_self/issues).
2. Create a new issue if applicable, or contribute to an existing issue.

### Related Links:
###### * [**_Agile Project Board_**](https://github.com/nagerz/quantified_self/projects/1)
###### * [**_Project Specifications_**](http://backend.turing.io/module4/projects/quantified_self/qs_server_side)
###### * [**_Project Rubric_**](http://backend.turing.io/module4/projects/quantified_self/rubric)

### Author
* [Zach Nager](https://github.com/nagerz)
* [Mackenzie Frey](https://github.com/Mackenzie-Frey)

### Special Recognition
* [Dione Wilson](https://github.com/dionew1)
* [Cory Westerfield](https://github.com/corywest)



<!-- Keep the below comment block in case the schema diagram need to be altered.
This can be done by visiting https://dbdiagram.io/d, creating a new diagram/ deleting
the diagram in the left hand bar and pasting in the below.

Table BoringQueries {
  id int [pk]
  query string
  created_at timestamp
  updated_at timestamp
}

Table BBQueries {
  id int [pk]
  query string
  created_at timestamp
  updated_at timestamp
}

Table HeartAttackQueries {
  id int [pk]
  query string
  created_at timestamp
  updated_at timestamp
}

Table BoringQueryRecipes {
  id int [pk]
  BoringQueryId int
  RecipeId int
  created_at timestamp
  updated_at timestamp
}

Table HeartAttackQueryRecipes {
  id int [pk]
  HeartAttackQueryId int
  RecipeId int
  created_at timestamp
  updated_at timestamp
}

Table BBQueryRecipes {
  id int [pk]
  BBQueryId int
  RecipeId int
  created_at timestamp
  updated_at timestamp
}

Table Recipes {
  id int [pk]
  name string
  url string
  image string
  yield string
  calories string
  totalTime string
  created_at timestamp
  updated_at timestamp
}

Ref: "BBQueryRecipes"."BBQueryId" < "BBQueries"."id"

Ref: "HeartAttackQueryRecipes"."HeartAttackQueryId" < "HeartAttackQueries"."id"

Ref: "BoringQueryRecipes"."BoringQueryId" < "BoringQueries"."id"

Ref: "BoringQueryRecipes"."RecipeId" < "Recipes"."id"

Ref: "HeartAttackQueryRecipes"."RecipeId" < "Recipes"."id"

Ref: "BBQueryRecipes"."RecipeId" < "Recipes"."id" -->
