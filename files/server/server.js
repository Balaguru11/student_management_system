const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const morgan = require("morgan");

const app = express();

//dotenv config
require("dotenv").config();

// //database
const dbcon = require("./config/database");

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
app.use(morgan("tiny"));

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
const apiRoutes = require("./routes/apiRoute");
const studentRouter = require("./routes/studentRoute");
const parentRouter = require("./routes/parentRoute.js");

//using imported routes
app.use("/school", schoolRoutes);
app.use("/staff", staffRoutes);
app.use("/student", studentRouter);
app.use("/activate", schoolActivate);
app.use("/api", apiRoutes);
app.use("/parent", parentRouter);

//routes
app.get("/", (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
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
    return res.render("server-error", { title: "Server Error" });
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
      return res.redirect("/");
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
});

//404
app.use((req, res) => {
  return res.status(404).render("404", { title: "404 Page" });
});

const PORT = process.env.PORT || 8000;

//listner
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
