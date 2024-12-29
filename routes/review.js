const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsyc=require("../utils/wrapAsyc.js");
const ExpressError=require("../utils/ExpressError.js");
const {reviewSchema} =require("../schema.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const reviewController=require("../controllers/reviews.js");

const validateReview=(req,res,next)=>{
    let {err}= reviewSchema.validate(req.body);
   
    if(err){
      let errMsg=error.details.map((el)=>el.message).join(",");
     throw new ExpressError(400,errMsg);
    }
    else{
      next();
    }
  }
//review
//post route
router.post("/",validateReview, wrapAsyc(reviewController.creatReview));
    
    //delete review route
    router.delete("/:id/reviewId",wrapAsyc(reviewController.deleteReview));
    module.exports=router;