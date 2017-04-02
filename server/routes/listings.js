var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var ListingSchema = mongoose.Schema({
  "cost" : Number,
  "rent": Number,
	"sqft" : Number,
	"address": String,
	"city": String
});
var Listings = mongoose.model("listings", ListingSchema);

//var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
// Defines HOW Documents will be saved to the Database
// var Listing = mongoose.Schema({
//   address: String,
//   city: String,
//   sqft: Number,
//   status: String
// });

// var Status = new Schema({
//
//     cost: Number,
//     rent: Number
//
// });

//var listing = mongoose.model('Listing', Listing, 'listings');
// var Status = mongoose.model( 'Status', Status, 'listings');
//
// Listing.status = mongoose.model('Status', Status, 'listings');

//GET employees`
//router.get("/status", function(req,res){
  //Get all employees
  // console.log("inside status" + Status);
  // Status.find(function(err, saleList){
  //   console.log('sold list ' + saleList);
  //   if(err){
  //     console.log(err);
  //     res.sendStatus(500);
  //   }
  //   res.send(saleList);
  // });
  router.get("/", function(req, res){
    Listings.find(function(err, Listings){
      //Get all employees
        if(err){
          console.log(err);
          res.sendStatus(500);
        }

      res.send(Listings);
    });


  });

module.exports = router;
