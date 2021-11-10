// import required models here


const session = require('express-session');
const dbcon = require('../DB/database')


exports.getCreateSchool = (req, res) => {
    res.render('schoolLevel/school-create', { title: 'Add a School' });
}

exports.postCreateSchool = async (req, res) => {
    let err_msg = ""; 
    let success_msg = "";

    try{
        var check = `SELECT EXISTS (SELECT * FROM school_add_school WHERE email='${req.body.email}') AS count`;
        //res >> 0 / 1 
         
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
                                return res.render('schoolLevel/school-create', { title: 'Add a School', success_msg: success_msg });
                            }
                        });
                    }else{
                        err_msg = "This School is already registered.";
                        return res.render('schoolLevel/school-create', { title: 'Add a School', err_msg: err_msg });
                    }
            }
        });
            
    }catch(e) {
        console.log(e);
        return res.status(500).send(e);
    }

}

exports.getSchoolLogin = (req, res) => {
    res.render('schoolLevel/school-login', { title: 'School Master Login'})
}

exports.postSchoolLogin = async (req, res) => {

    try{
        var loginQuery = `SELECT * FROM school_add_school WHERE school_login='${req.body.schoolUserName}' AND school_secrete='${req.body.schoolPassword}'`;
        dbcon.query(loginQuery, function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length == 1){
                    let session = req.session;
                    session.schoolUserName = req.body.schoolUserName;
                    session.schoolId = result[0].id;
                    session.schoolStatus = result[0].status;
                    session.logged_in = true;
                    res.status(200).redirect('/school/dashboard');
                }else{
                    res.send("No user found");
                }
            })
    }catch(e){
        console.log(e);
        return res.status(500).send(e);
    }
}

exports.getSchoolDashBoard = (req, res) => {
    try{
        let session = req.session;

        if(session.logged_in){
            res.render('schoolLevel/school-dashboard', { title: 'School Master Dashboard'});
        }else{
            err_msg = "You are unauthorized. Please login.";
            return res.status(401).redirect('/school/login');
        }
    }catch(e){
        console.log(e);
    }
}

exports.postAddClassroom = async(req, res) => {

    let err_msg = "";
    let success_msg = "";

    try {

        let session = req.session;

        if(session.logged_in && session.schoolStatus == 'Active'){

            const user = session.schoolUserName;
            const schoolId = session.schoolId;
        
            var classCheck = `SELECT EXISTS (SELECT * FROM school_classroom WHERE class_section='${req.body.class_section}' AND medium='${req.body.medium}' AND school_id='${schoolId}' ) AS count`;

            dbcon.query(classCheck, (err, data) => {

                if(err){
                    err_msg = "We could not create a new classroom at the moment."
                    return res.status(500).render('schoolLevel/school-dashboard', { title: 'School Master Dashboard', err_msg: err_msg });
                }else{
                    if(data[0].count == 0){
                        
                        const addClass = `INSERT INTO school_classroom(school_id, class_section, medium, students_strength) VALUES ('${schoolId}', '${req.body.class_section}', '${req.body.medium}', '${req.body.strength}');`;

                        dbcon.query(addClass, function(err){
                            if(err){
                                console.log(err);
                                // err_msg = "There is an error when adding a classroom. Please try again later.";
                                // return res.status(500).render('schoolLevel/school-dashboard', { title: 'School Master Dashboard', err_msg: err_msg });
                            }else{
                                success_msg = "A New classroom has been added. You can enroll and add students to this class.";
                                return res.status(200).render('schoolLevel/school-dashboard', { title: 'School Master Dashboard', success_msg });
                            }
                        })
                    }else{
                        err_msg = "This classroom is already added to this School.";
                        return res.render('schoolLevel/school-dashboard', { title: 'School Master Dashboard', err_msg: err_msg });
                    }
                }
            })
        }else{
            err_msg = "The School is not yet submitted the documents yet. Please contact our customer service or Email the required documents to activate@sms.com.";
            return res.status(401).redirect('/school/login');
        }
    }catch(e){
        console.log(e);
        return res.status(500).send(e);
    }
}


//WORKIMNG ON THIS ONE
exports.postAddUser = async(req, res) => {
    let err_msg = "";
    let success_msg = "";

    try {
        let session = req.session;

        if(session.logged_in){

            const user = session.schoolUserName;
            const schoolId = session.schoolId;
        
            var userCheck = `SELECT EXISTS (SELECT * FROM school_main_login WHERE username='${req.body.username}' AND email='${req.body.email}' AND school_id=(SELECT id FROM school_add_school WHERE school_name='${user}')) AS count`;

            dbcon.query(userCheck, (err, data) => {

                if(err){
                    err_msg = "We could not add new user at the moment."
                    return res.status(500).render('schoolLevel/school-dashboard', { title: 'School Master Dashboard', err_msg: err_msg });
                }else{
                    if(data[0].count == 0){
                        
                        const addClass = `INSERT INTO school_classroom(school_id, class_section, medium, students_strength) VALUES ('${schoolId}', '${req.body.class_section}', '${req.body.medium}', '${req.body.strength}');`;

                        dbcon.query(addClass, function(err){
                            if(err){
                                console.log(err);
                                // err_msg = "There is an error when adding a classroom. Please try again later.";
                                // return res.status(500).render('schoolLevel/school-dashboard', { title: 'School Master Dashboard', err_msg: err_msg });
                            }else{
                                success_msg = "A New classroom has been added. You can enroll and add students to this class.";
                                return res.status(200).render('schoolLevel/school-dashboard', { title: 'School Master Dashboard', success_msg });
                            }
                        })
                    }else{
                        err_msg = "This classroom is already added to this School.";
                        return res.render('schoolLevel/school-dashboard', { title: 'School Master Dashboard', err_msg: err_msg });
                    }
                }
            })
        }else{
            err_msg = "You are unauthorized. Please login.";
            return res.status(401).redirect('/school/login');
        }
    }catch(e){
        console.log(e);
        return res.status(500).send(e);
    }
}