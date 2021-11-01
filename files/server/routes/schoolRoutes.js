const express = require('express');
const schoolRouter = express.Router();
// const bcrypt = require('bcryptjs');
const dbcon = require('../DB/database')

schoolRouter.get('/create', (req, res) => {
    res.render('school-create', { title: 'Add a School' });
});

schoolRouter.post('/create', async (req, res) => {
    try{
        var check = `SELECT EXISTS (SELECT * FROM school_add_school WHERE email='${req.body.email}') AS count`;
        //res >> 0 / 1 
        
        // `SELECT * FROM school_add_school WHERE email='${req.body.email}'`;
 
        dbcon.query(check, (err, data) => {
            console.log(data[0].count);
            if(err){
                console.log("There is an error with Database connection.");
            }else{
        
                if(data[0].count == 0){
                    const sql = `INSERT INTO school_add_school(school_name, board, email, city, school_login, school_secrete, status) VALUES ('${req.body.schoolName}', '${req.body.board}', '${req.body.email}', '${req.body.schoolLocation}', '${req.body.schoolUserName}', '${req.body.schoolPassword}', 'Inactive');`;

                        dbcon.query(sql, function (err, result) {
                            if (err) return console.log(err);
                            console.log(result);
                            return res.render('school-login', {title: 'School Added'});
                        });
                    }else{
                        console.log("School already Exists.");
                        return;
                    }
            }
        });
            
    }catch(e) {
        console.log(e);
        return res.status(500).send(e);
    }

});


schoolRouter.get('/login', (req, res) => {
    res.render('school-login', { title: 'School Master Login'})
});

schoolRouter.post('/login', (req, res) => {

    try{
        var loginQuery = `SELECT * FROM school_add_school WHERE school_login='${req.body.schoolUserName}' AND school_secrete='${req.body.schoolPassword}'`;
        dbcon.query(loginQuery, function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result == 1){
                    // res.status(200).send("Logged In.");
                    res.render('dashboard', { title: 'Dashboard'});
                }else{
                    res.send("No user found");
                }
            })
    }catch(e){
        console.log(e);
        return res.status(500).send(e);
    }

});


module.exports = schoolRouter