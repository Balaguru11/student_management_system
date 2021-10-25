const { createPool } = require('mysql');

const pool = createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"student_management_system",
    connectionLimit: 10
})

pool.query('select * from school_main_login', (err, result, fields) => {
    if(err){
        return console.log(err);
    }
    return console.log("Database connected successfully");
});