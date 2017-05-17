var express                 = require("express"),
    app                     = express(),
    mongoose                = require("mongoose"),
    bodyParser              = require("body-parser"),
    expressSession          = require("express-session"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    // MODELS
    User                    = require("./models/user")
    

// DATABASE SETTINGS
mongoose.connect("mongodb://localhost/auth_demo")    

// APP SETTINGS
app.set("view engine", "ejs")
app.use(passport.initialize())
app.use(passport.session())
app.use(expressSession({
    secret: "Im Mary Poppins yall",
    resave: false,
    saveUninitialized: false
}))

// PASSPORT SETTINGS
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


// ================== //
//       ROUTES       //
// ================== //

// INDEX ROUTE
app.get("/", function(request, response){
    response.render("home")
})

// MEMBERS ONLY ROUTE
app.get("/members", function(request, response){
    response.render("members")
})

// AUTH ROUTES
app.get("/signup", function(request, response){
    response.render("signup")
})

app.post("/signup", function(request, response){
    response.send("You totally just signed up!")
})


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Auth server is running...")
})