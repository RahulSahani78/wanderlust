const Listing=require("../models/listing");
const Review=require("../models/review");

module.exports.creatReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","new review added");
    
    // console.log("new review saved");
    // res.send("new review saved");
    res.redirect(`/listings/${listing._id}`)
    }
module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params;
   await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","new review deleted");
    res.redirect(`/listing/${id}`);
  }