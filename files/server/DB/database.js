// const { createPool } = require('mysql');

// const pool = createPool({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"student_management_system",
//     connectionLimit: 10
// })

// pool.query('select * from school_main_login', (err, result, fields) => {
//     if(err){
//         return console.log(err);
//     }
//     return console.log("Database connected successfully");
// });

// working code before sequelize
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student_management_system",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) {
    return console.log(err);
  }
  return console.log("Database connected successfully");
});

module.exports = con;

// const Sequelize = require('sequelize');
// require('dotenv').config();

// const init = () => {
//     const { DB_HOST, DB_USER, DB_DB, DB_PASS } = process.env;
//     const sequelize = new Sequelize(DB_USER, DB_DB, DB_PASS, {
//         host: DB_HOST,
//         dialect: 'mysql'
//     });
//     return sequelize;
// }

// module.exports = { sequelize: init() };
