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
mongoose.Promise = global.Promise

// APP SETTINGS
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressSession({
    secret: "Im Mary Poppins yall",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// PASSPORT SETTINGS
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


//                   ROUTES                   //
// ========================================== //

// INDEX ROUTE
app.get("/", function(request, response){
    response.render("home")
})

// MEMBERS ONLY ROUTE
app.get("/members", isLoggedIn, function(request, response){
    response.render("members")
})

// AUTH ROUTES
// - New user registration logic
app.get("/signup", function(request, response){
    response.render("signup")
})

app.post("/signup", function(request, response){
    User.register(new User({
            username: request.body.username
        }), request.body.password, function(error, addedUser){
        if(error){
            console.log(error)
            return response.render("register")
        }
        passport.authenticate("local")(request, response, function(){
            response.redirect("/members")
        })
    })
})

// - User login logic
app.get("/login", function(request, response){
    response.render("login")
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/members",
    failureRedirect: "/login"
}), function(request, response){
})

// - Log out logic
app.get("/logout", function(request, response) {
    request.logout()
    response.redirect("/")
})


// MIDDLEWARE
function isLoggedIn(request, response, next){
    console.log(request.isAuthenticated())
    if(request.isAuthenticated()){
        console.log("You're okay with me buddy!")
        return next()
    }
    console.log("You're not on the list!")
    response.redirect("/login")
}


// LISTENER
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Auth server is running...")
})