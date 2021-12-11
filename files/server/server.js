const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const payUMoney = require("payumoney_nodejs");
// const nodemailer = require("nodemailer");

// const { sequelize } = require('./DB/database');
// models import
// const Schools = sequelize.import(__dirname + '/model/school.model.js');

const app = express();

//dotenv config
require("dotenv").config();

// //database
const dbcon = require("./DB/database");

const PORT = process.env.PORT || 8000;

//set Cookie Parser, session and flash
app.use(methodOverride("_method"));
app.use(cookieParser("ThisIsTheStringToParseTheCookies"));
app.use(
  session({
    name: "account",
    secret: "SecretStringForExpressSession",
    cookie: { maxAge: 1200000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

payUMoney.setSandboxKeys(
  (MERCHANT_KEY = process.env.MERCHANT_KEY),
  (MERCHANT_SALT = process.env.MERCHANT_SALT),
  (PAYUMONEY_AUTHORIZATION_HEADER = process.env.AUTHORIZATION_HEADER)
);
// sandbox mode ON

//body-parser deprecated
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//email transporter
// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD,
//     clientId: process.env.OAUTH_CLIENTID,
//     clientSecret: process.env.OAUTH_CLIENT_SECRET,
//     refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//   },
// });

//layouts
app.use(expressLayouts);
app.set("layout", "./layouts/full-layout");

// to access static files like css, js, images etc..
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/js", express.static(__dirname + "public/js"));

//register ejs view engine
app.set("view engine", "ejs");

// routes import
const schoolRoutes = require("./routes/schoolRoutes");
const staffRoutes = require("./routes/staffRoutes");
const schoolActivate = require("./routes/activate");
const apiRoutes = require("./routes/apiRoute");
const studentRouter = require("./routes/studentRoute");

//using imported routes
app.use("/school", schoolRoutes);
app.use("/staff", staffRoutes);
app.use("/student", studentRouter);
app.use("/activate", schoolActivate);
app.use("/api", apiRoutes);

//routes
app.get("/", (req, res) => {
  //flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  try {
    let session = req.session;
    if (!session.logged_in) {
      const fetch_role = `SELECT * FROM school_role`;
      dbcon.query(fetch_role, (err, data) => {
        if (err) throw err;
        res.locals.data = data;
        return res.render("home", {
          title: "Home",
          layout: "./layouts/home_layout",
        });
      });
    } else if (session.schoolUserName) {
      return res.redirect("/school/dashboard");
    } else {
      return res.redirect("/staff/dashboard");
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/login", (req, res) => {
  return res.redirect("/");
});

app.get("/logout", (req, res) => {
  try {
    let session = req.session;
    if (session.id) {
      req.session.destroy();
      res.clearCookie("account");
      console.log("logged out");
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
});

// app.use ((req, res) => {
//   return res.send('loading...');
// })

// //errorhandling
// app.use((err, req, res, next) => {
//   if (err) {
//     return res.redirect("/error");
//   } else {
//     next();
//   }
// });

//404
app.use((req, res) => {
  res.status(404).render("404", { title: "404 Page" });
});

//listner
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
