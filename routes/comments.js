var express = require("express");
// req.params.id not going through comments.js, needs mergeParams to fix req.params.id = null
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");


// Comments NEW
router.get("/new", isLoggedIn, function(req, res){
  // find campground by id
  // req.params.id is null in value without the mergeParams: true
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

// Comments CREATE
// handle add comment
router.post("/", isLoggedIn, function(req, res){
  // lookup campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // create new comment
      Comment.create(req.body.comment, function(err, comment){
        if (err) {
          console.log(err);
        } else {
          // add comment to campground 
          campground.comments.push(comment);
          // save comment to campground
          campground.save();
          // 
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// MIDDLEWARE
// add isLoggedIn middleware 
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    // if authenticated, continue showing pages
    return next();
  }
  // if not authenticated, show login page, 
  res.redirect("/login");
}

module.exports = router;