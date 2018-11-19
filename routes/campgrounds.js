var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


// INDEX - list all campgrounds
router.get("/", function(req, res){
  // Get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds){
    if (err) {
      console.log(err);
    } else {
      // display all campgrounds and get currentUser if any
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  });
});

// CREATE - save newly added campground
router.post("/", function(req, res){
  // get data from new campground form and add to campgrounds db
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  // make name and image variables as object
  var newCampground = {name: name, image: image, description: desc};
  // and push newCampground to campgrounds array
  // campgrounds.push(newCampground);

  // Create new campground and save to db
  Campground.create(newCampground, function(err, newlyCreated){
    if (err) {
      console.log(err)
    } else {
      // redirect back to campgrounds page which by default will go to /campgrounds app.get ROUTE
      res.redirect("/campgrounds");
    }
  });  
});

// NEW - add new campground
router.get("/new", function(req, res){
  res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
  // find the campground with the provided ID
  // and populate with comments
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
  // Campground.findById(req.params.id, function(err, foundCampground){  
    if (err) {
      console.log(err);
    } else {
      // console.log(foundCampground);
      // render show template with that campground
      // res.send("THIS WILL BE THE SHOW PAGE SOON!");
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

module.exports = router;