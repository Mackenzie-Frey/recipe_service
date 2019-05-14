var shell = require('shelljs');

const testSetup = () => {
  shell.exec('npx sequelize db:create')
  shell.exec('npx sequelize db:migrate')
}

const tearDown = () => {
  shell.exec('npx sequelize db:migrate:undo:all')
}

module.exports = {
  testSetup,
  tearDown
}
