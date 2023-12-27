import mysql2 from 'mysql2';

const database = mysql2.createPool({
    host: 'localhost:3306', // host database
    user: 'root', // user database
    password: '', // password database
    database: 'try_express', // database name
}).promise();

export default database;