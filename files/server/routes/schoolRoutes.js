const express = require('express');
const schoolRouter = express.Router();
// const bcrypt = require('bcryptjs');
const dbcon = require('../DB/database')

schoolRouter.get('/create', (req, res) => {
    res.render('school-create', { title: 'Add a School' });
});

schoolRouter.post('/create', async (req, res) => {
    let err_msg = ""; 
    let success_msg = "";

    try{
        var check = `SELECT EXISTS (SELECT * FROM school_add_school WHERE email='${req.body.email}') AS count`;
        //res >> 0 / 1 
        
        // `SELECT * FROM school_add_school WHERE email='${req.body.email}'`;
 
        dbcon.query(check, (err, data) => {
            if(err){
                err_msg = "There is an error with Database connection.";
                return res.render('school-create', { err_msg: err_msg });
            }else{
                if(data[0].count == 0){
                    const sql = `INSERT INTO school_add_school(school_name, board, email, city, school_login, school_secrete, status) VALUES ('${req.body.schoolName}', '${req.body.board}', '${req.body.email}', '${req.body.schoolLocation}', '${req.body.schoolUserName}', '${req.body.schoolPassword}', 'Inactive');`;

                        dbcon.query(sql, function (err) {
                            if (err) {
                                err_msg = "There is an error when adding new school";
                                return res.render('school-create', { title: 'Add a School', err_msg: err_msg });
                            }else{
                                success_msg = "The school has been added successfully";
                                return res.render('school-create', { title: 'Add a School', success_msg: success_msg });
                            }
                        });
                    }else{
                        err_msg = "This School is already registered."
                        return res.render('school-create', { title: 'Add a School', err_msg: err_msg });
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
                    res.render('school-dashboard', { title: 'Dashboard'});
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