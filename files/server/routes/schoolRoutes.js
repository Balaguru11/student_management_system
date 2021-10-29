const express = require('express');
const schoolRouter = express.Router();
// const bcrypt = require('bcryptjs');
const dbcon = require('../DB/database')

schoolRouter.get('/create', (req, res) => {
    res.render('school-create', { title: 'Add a School' });
});

schoolRouter.post('/create', async (req, res) => {
    try{
        // var check = `SELECT * FROM school_add_school WHERE email='${req.body.email}'`;
        // dbcon.query(check, (err, res) => {
        //     if(err){
        //         console.log("Getting error here");
        //     }else if (res.length === 0) {
        //             console.log("No data");
        //     }else{
        //         console.log("The School already exists.")
        //     }
        // });

        
            var sql = `INSERT INTO school_add_school (school_name, board, email, city, school_login, school_secrete) VALUES ("${req.body.schoolName}", "${req.body.board}", "${req.body.email}", "${req.body.schoolLocation}", "${req.body.schoolUserName}", "${req.body.schoolPassword}")`;

            await dbcon.query(sql, (err, res) => {
                if (err) {
                    return console.log(err);
                }
                return res.status(200).send("Added.");
            });
        }catch(e) {
            console.log(e);
            return res.status(500).send(e);
        }

});

// schoolRouter.get('/login', (req, res) => {

// });


module.exports = schoolRouter