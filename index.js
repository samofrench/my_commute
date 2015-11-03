var express = require("express");
var app = express();

var flash = require("connect-flash");
app.use(flash());

var session = require("express-session");
app.use(session({
	secret: 'hoh298wefubw',
	resave: false,
	saveUninitialized: true
}));

var bcrypt = require('bcryptjs');

var db = require("./models");

var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);
app.set("view engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));


app.use(express.static(__dirname+ '/static'));

app.use(function (req, res, next){
  res.locals.currentUser = req.session.user;
  res.locals.alerts = req.flash();
  next();
});

app.get("/", function (req, res) {
	res.render("index");
});

app.use("/auth", require("./controllers/auth"));

app.use("/:id", require("./controllers/id"))

app.listen(3000);