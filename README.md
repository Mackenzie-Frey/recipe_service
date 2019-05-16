# README

## Description
Recipe Service is part of a 10-day, paired project during module four of four, of Turing School's Back-End Engineering Program. Recipe Service is a microservice which consumes the Edamam Recipe API and is utilized by [Quantified Self](https://github.com/nagerz/quantified_self). The application utilizes Node.js, Expess, Sequelize, PostgreSQL, and Jest.

#### [**_View Recipe Service in Production_**](https://sq-recipe-service.herokuapp.com/) </br>

### Schema
<!-- ![Alt text](./public/images/schema.png?raw=true "Database Schema") -->

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

## Deployment

To view Recipe Service in development, execute the following command from the project directory: `nodemon npm start`. To view the application in a web browser, visit `localhost:3000` and navigate the the desired endpoint.


## Available Endpoints
The application provides the following endpoints:

#### Endpoints

###### Recipe Index Endpoint
------------>>>>>> INSERT THINGS HERE <<<<<---------- can be retrieved via a `GET` request to the `api/v1/recipes?query=chicken` endpoint.

If the request is successful, the application will return an array containing food item objects, along with a status code of 200.

``` HTTP
status: 200
body:
{
  INSERT THING HERE <<<<<<<<<<<--------------------
}
```

###### Heart Attack Recipe Index Endpoint
------------>>>>>> INSERT THINGS HERE <<<<<---------- can be retrieved via a `GET` request to the `api/v1/recipes/heart-attack?query=chicken` endpoint.

If the request is successful, the application will return an array containing food item objects, along with a status code of 200.

``` HTTP
status: 200
body:
{
  INSERT THING HERE <<<<<<<<<<<--------------------
}
```

###### Bang for your Buck Recipe Index Endpoint
------------>>>>>> INSERT THINGS HERE <<<<<---------- can be retrieved via a `GET` request to the `/api/v1/recipes/bang-for-your-buck?query=chicken` endpoint.

If the request is successful, the application will return an array containing food item objects, along with a status code of 200.

``` HTTP
status: 200
body:
{
  INSERT THING HERE <<<<<<<<<<<--------------------
}
```

## Test Coverage
To run a test coverage report execute the command: `npx jest --coverage`. The report will look like the following.

![Alt text](./public/images/test_coverage.png?raw=true "Test Coverage Report")

Navigate to the project directory of `coverage/lcov-report/recipe_service/`. Copy the file path and execute the command: `open insert_file_path`. This will open the specific coverage report in the default browser.

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

## Known Issues
------------>>>>>>>>>>> Add here

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
