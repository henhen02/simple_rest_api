const mysql2 = require('mysql2');
// Configuring SQL database
// You must create database first, just copy from my sceme at ./schema/schema.sql
// You can change the name of the database, user, password, and host
// Tips: Kalo gamau ribet, bikin aja database sama usernya root, passwordnya kosong, sama nama databasenya jangan lupa disamain jadi try_express
const database = mysql2.createPool({
    host: 'localhost:3306', // host database
    user: 'root', // user database
    password: '', // password database
    database: 'try_express', // database name
}).promise();

module.exports = database;
