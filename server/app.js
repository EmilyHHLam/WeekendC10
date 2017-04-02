var express = require("express");
var app = express();
var bodyParser = require ("body-parser");
var path = require("path");
var mongoose = require("mongoose");
Schema              = mongoose.Schema;

//routes import
var listings = require("./routes/listings.js");

var mongoURI = "mongodb://localhost:27017/realestate";
//var mongoURI = "mongodb://users:1234567@ds147480.mlab.com:47480/emily-testdb";
var MongoDB = mongoose.connect(mongoURI).connection;

//If there is an error connecting to the database, let us know!
MongoDB.on("error", function(err){
  console.log("Mongo Connection Error :" + err);
});

//If we successfully hooked up to the database, let us know!
MongoDB.once("open", function(){
  console.log("Tots connected to Mongo, meow.");
});
app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./server/public/"));

//app.use("/status", listings);
app.get("/", function(req,res){
  res.sendFile(path.resolve("server/public/views/index.html"));
});

app.use("/listing", listings);


app.listen(app.get("port"), function() {
  console.log("listening on port " + app.get("port"));
});
