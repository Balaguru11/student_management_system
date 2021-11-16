const session = require("express-session");
const dbcon = require("../DB/database");

exports.postStaffLogin = async (req, res) => {
  let err_msg = "";
  let success_msg = "";
  let staff_role = "";

  try {
    var staffLoginQuery = `SELECT * FROM school_main_login WHERE role_id_fk='${req.body.role}' AND username='${req.body.username}' AND password='${req.body.password}'`;

    dbcon.query(staffLoginQuery, function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length == 1) {
        let session = req.session;
        session.username = req.body.username;
        session.roleId = result[0].role_id_fk;
        session.email = result[0].email;
        staff_role = `${session.roleId}`; //returns 8
        session.logged_in = true;
        return res
          .status(200)
          .redirect("/staff/dashboard/?staff_role=" + staff_role);
      } else {
        res.send("No User found");
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

exports.getStaffDashboard = (req, res) => {
  try {
    let session = req.session;

    if (session.logged_in) {
      staff_role = req.params.staff_role;
      res.render("staffLevel/staff-dashboard", {
        title: "Staff Dashboard",
        staff_role,
      });
    } else {
      err_msg = "You are unauthorized. Please login.";
      return res.status(401).redirect("/?err_msg=" + err_msg);
    }
  } catch (e) {
    console.log(e);
  }
};

// displays Staff Profile Form
exports.getStaffProfileForm = async (req, res) => {
  try {
    let session = req.session;
    // console.log(session);
    let err_msg = "";
    let success_msg = "";
    let staff_email = session.email;

    // //query
    // var emailFetch = `SELECT email FROM school_main_login WHERE email='${session.email}'`;

    // dbcon.query(emailFetch, (err, email) => {
    //   if (err) console.log(err);

    // });

    if (!session.logged_in || session.staffStatus == "Inactive") {
      err_msg = "You are unauthorized to view this page. Please login.";
      return res.status(401).render("login", { title: "Login", err_msg });
    } else {
      success_msg = req.params.success_msg;
      res.render("staffLevel/staff-profile", {
        title: "Staff Profile",
        success_msg,
        staff_email,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

// Staff fills their Profile n sent to DB
exports.postStaffProfile = (req, res) => {
  let err_msg = "";
  let success_msg = "";
  let staff_email = "";
  try {
    let session = req.session;
    console.log("------- Add Staff Profile is here -----------");
    const username = session.username;

    if (session.logged_in) {
      var checkStatus = `SELECT * FROM school_main_login WHERE username='${username}' AND status='Active'`;

      dbcon.query(checkStatus, (err, result) => {
        if (err) {
          err_msg =
            "There is a Problem in creating your Profile Page. Please try again later. ";
          return res
            .status(500)
            .render("staffLevel/staff-profile", { err_msg });
        } else if (result) {
          const role_id = result[0].role_id_fk;
          const staff_id = result[0].id;
          const school_id = result[0].school_id;
          staff_email = result[0].email;
          // const password = result[0].password;

          var profileQuery = `INSERT INTO school_staff(role_id, staff_id, school_id, name, date_of_birth, mobile_number, email, qualification, city, state) VALUES ('${role_id}', '${staff_id}','${school_id}', '${req.body.staffName}', '${req.body.staff_dob}', '${req.body.staff_mobile}', '${staff_email}', '${req.body.staff_qualification}', '${req.body.staff_city}', '${req.body.staff_state}' ) `;

          dbcon.query(profileQuery, function (err, result) {
            if (err) {
              console.log(err);
            } else {
              success_msg = "Profile saves successfully";
              return res.redirect("/staff/profile/?success_msg=" + success_msg);
            }
          });
        } else {
          console.log(result);
        }
      });
    } else {
      console.log("Testing");
    }
  } catch (e) {
    console.log(e);
  }
};
