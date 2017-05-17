var express                 = require("express"),
    app                     = express(),
    mongoose                = require("mongoose"),
    
    
// APP SETTINGS
app.set("view engine", "ejs")

// DATABASE SETTINGS
mongoose.connect("mongodb://localhost/auth_demo")

// INDEX ROUTE
app.get("/", function(request, response){
    response.render("home")
})


// MEMBERS ONLY ROUTE
app.get("/members", function(request, response){
    response.render("members")
})


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Auth server is running...")
})