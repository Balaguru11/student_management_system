const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

// const { sequelize } = require('./DB/database');
// models import
// const Schools = sequelize.import(__dirname + '/model/school.model.js');

const app = express();

//dotenv config
require("dotenv").config();

// //database
require("./DB/database");

const PORT = process.env.PORT || 8000;

//set Cookie Parser, session and flash
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

//body-parser deprecated
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

//using imported routes
app.use("/school", schoolRoutes);
app.use("/staff", staffRoutes);
app.use("/activate-school", schoolActivate);

// //dashboard rourte
// app.get('/dash', (req, res) => {
//     res.render('dashboard', { title: 'Dashboard', layout: './layouts/with-sidebar'});
// });

//routes
app.get("/", (req, res) => {
  res.render("login", { title: "Home" });
});

// app.post("/", (req, res) => {
//   const { username, password } = req.body;
// });

app.get("/logout", (req, res) => {
  try {
    let session = req.session;
    if (session.id) {
      console.log(session);
      console.log(res);
      req.session.destroy(function (err) {
        res.clearCookie("account");
        console.log("Logged out");
        return res.redirect("/");
      });
    }
  } catch (e) {
    console.log(e);
  }
});

//404
app.use((req, res) => {
  res.status(404).render("404", { title: "404 Page" });
});

//listner
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
