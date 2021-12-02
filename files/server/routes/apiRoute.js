const express = require("express");
const apiRouter = express.Router();
const session = require("express-session");
const dbcon = require("../DB/database");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

apiRouter.post("/get-class-sections", (req, res) => {
  var getclassection =
    'SELECT *, (students_strength - students_filled) AS seats_free FROM school_classroom WHERE class_id= "' +
    req.body.class_id +
    '"';
  dbcon.query(getclassection, (err, rows) => {
    if (err) {
      res.json({ msg: "error" });
    } else {
      res.json({
        msg: "success",
        class_secs: rows,
      });
    }
  });
});

// apiRouter.post("/get-class-fee", (req, res) => {
//   var getclassfee =
//     'SELECT * FROM school_feestructure WHERE class_id= "' +
//     req.body.class_id +
//     '"';
//   dbcon.query(getclassfee, (err, row) => {
//     if (err) {
//       res.json({ msg: "error", err });
//     } else {
//       console.log(row);
//       res.json({
//         msg: "success",
//         class_fee: row,
//       });
//     }
//   });
// });

module.exports = apiRouter;
