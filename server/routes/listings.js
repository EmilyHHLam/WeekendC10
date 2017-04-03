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

//GET listing
  router.get("/", function(req, res){
    Listings.find(function(err, Listings){
      //Get all listing
        if(err){
          console.log(err);
          res.sendStatus(500);
        }

      res.send(Listings);
    });


  });
  //Save a new employee
router.post("/", function(req,res){
  //Instance of the Model to be saved to the database
  var listing = new Listings();
  var status = req.body.status;
  console.log("status=" + status);
  if (status == 0) {
    listing.rent = req.body.price;
  }else {
    listing.cost = req.body.price;
  }
  listing.address = req.body.address;
  listing.city = req.body.city;
  listing.sqft = req.body.sqft;
  listing.save(function(err, savedListing){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }

    res.send(savedListing);
  });
});

module.exports = router;
